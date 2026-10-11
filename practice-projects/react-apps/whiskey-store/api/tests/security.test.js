process.env.JWT_ACCESS_SECRET = "test-access-secret-that-is-at-least-32-characters";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret-that-is-at-least-32-characters";

jest.mock("../lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    refreshToken: { create: jest.fn() },
  },
}));

jest.mock("../controllers/productController", () => ({
  createProduct: jest.fn((req, res) => res.sendStatus(201)),
  deleteProduct: jest.fn((req, res) => res.sendStatus(204)),
  getFilters: jest.fn(),
  getProductById: jest.fn(),
  getProducts: jest.fn(),
  putProduct: jest.fn((req, res) => res.sendStatus(200)),
}));

const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");
const userController = require("../controllers/userController");
const userSchema = require("../validators/userValidator");
const productsRoute = require("../routes/products");
const errorHandler = require("../middleware/errorHandler");

describe("security controls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects role assignment through the user validator", () => {
    const { error } = userSchema.validate({
      name: "New User",
      email: "new@example.com",
      password: "password123",
      role: "admin",
    });

    expect(error).toBeDefined();
  });

  it("never returns a password hash from getProfile", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: "User",
      email: "user@example.com",
      role: "user",
      password: "hash",
    });
    const res = { json: jest.fn() };

    await userController.getProfile({ user: { id: 1 } }, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.not.objectContaining({ password: expect.anything() }),
    );
  });

  it("never returns a password hash from editUser", async () => {
    prisma.user.update.mockResolvedValue({
      id: 1,
      name: "Updated User",
      email: "user@example.com",
      role: "user",
      password: "hash",
    });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.editUser(
      {
        params: { id: "1" },
        user: { id: 1, role: "user" },
        body: { name: "Updated User" },
      },
      res,
      jest.fn(),
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
      user: expect.not.objectContaining({ password: expect.anything() }),
    });
  });

  it("rejects role changes when editing a profile", async () => {
    const next = jest.fn();

    await userController.editUser(
      {
        params: { id: "1" },
        user: { id: 1, role: "user" },
        body: { role: "admin" },
      },
      { status: jest.fn().mockReturnThis(), json: jest.fn() },
      next,
    );

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].statusCode).toBe(400);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("allows a user to delete their own account without trusting query identity", async () => {
    prisma.user.delete.mockResolvedValue({});

    await userController.deleteUser(
      {
        params: { id: "1" },
        query: { userId: "999" },
        user: { id: 1, role: "user" },
      },
      { status: jest.fn().mockReturnThis(), json: jest.fn() },
      jest.fn(),
    );

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("requires authentication and admin role for every product write", async () => {
    const app = express();
    app.use(express.json(), productsRoute, errorHandler);
    const userToken = jwt.sign(
      { id: 1, role: "user" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );
    const adminToken = jwt.sign(
      { id: 2, role: "admin" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );

    for (const [method, path, adminStatus] of [
      ["post", "/", 201],
      ["put", "/1", 200],
      ["delete", "/1", 204],
    ]) {
      const unauthenticated = await request(app)[method](path).send({});
      const nonAdmin = await request(app)
        [method](path)
        .set("Authorization", `Bearer ${userToken}`)
        .send({});
      const admin = await request(app)
        [method](path)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(unauthenticated.statusCode).toBe(401);
      expect(nonAdmin.statusCode).toBe(403);
      expect(admin.statusCode).toBe(adminStatus);
    }
  });
});
