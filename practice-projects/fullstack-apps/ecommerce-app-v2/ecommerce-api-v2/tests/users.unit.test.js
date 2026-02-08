const userController = require('../controllers/userController');
const usersData = require('../data/usersData');
const CustomError = require('../utils/customError');

describe('Users API Unit Tests', () => {
  beforeEach(() => {
    req = {
      user: { id: 1 },
      params: { id: 1 },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    next = jest.fn();
  });

  it('should return the user profile if the user exists', () => {
    userController.getProfile(req, res, next);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if the user does not exist', () => {
    req.user.id = 999;
    userController.getProfile(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
    expect(next.mock.calls[0][0].message).toMatch(/not found/i);
  });

  it('should return all users', () => {
    userController.getAllUsers(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
    expect(res.json.mock.calls[0][0].length).toBe(usersData.length);
  });

  it('should get the user by id', () => {
    userController.getUserById(req, res, next);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should register user', () => {
    req.body = {
      name: 'test',
      email: 'test@test.com',
    };

    userController.registerUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
        }),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });
});
