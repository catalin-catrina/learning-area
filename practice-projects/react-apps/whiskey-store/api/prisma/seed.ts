import type { OrderStatus, ProductType } from "../generated/prisma/enums";

const { prisma } = require("../lib/prisma");
import bcrypt from "bcrypt";
import usersDataSource from "../data/usersData.js";
import productsDataSource from "../data/productsData.js";
import ordersDataSource from "../data/ordersData.js";

type SeedUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  password: string;
};

type SeedProduct = {
  id: number;
  name: string;
  distillery: string;
  region: string;
  country: string;
  type: ProductType;
  age: number | null;
  abv: number;
  price: number;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: { userId: number; rating: number; comment: string | null }[];
};

type SeedOrder = {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  status: OrderStatus;
  createdAt: string;
};

const usersData = usersDataSource as SeedUser[];
const productsData = productsDataSource as SeedProduct[];
const ordersData = ordersDataSource as SeedOrder[];

async function main() {
  const productsById = new Map<number, SeedProduct>(
    productsData.map((product): [number, SeedProduct] => [product.id, product]),
  );

  // seed users loop
  for (const user of usersData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    const passwordHash = await bcrypt.hash(user.password, 10);
    const seededPasswordHash =
      existingUser?.password === user.password ? passwordHash : undefined;

    await prisma.user.upsert({
      where: { email: user.email },
      update: seededPasswordHash ? { password: seededPasswordHash } : {},
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        password: passwordHash,
      },
    });
  }
  // seed products loop
  for (const product of productsData) {
    const { reviews, ...productFields } = product;
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        ...productFields,
        reviews: {
          create: reviews.map((r) => ({
            rating: r.rating,
            comment: r.comment,
            userId: r.userId,
          })),
        },
      },
    });
  }
  // seed orders loop
  for (const order of ordersData) {
    const { products, createdAt, ...orderFields } = order;

    const items = products.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) {
        throw new Error(
          `Seed order ${order.id} references missing product ${item.productId}`,
        );
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        productName: product.name,
        unitPriceCents: Math.round(product.price * 100),
      };
    });
    const totalCents = items.reduce(
      (total, item) => total + item.unitPriceCents * item.quantity,
      0,
    );

    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        ...orderFields,
        totalCents,
        createdAt: new Date(createdAt),
        shippingAddress: {},
        items: {
          create: items,
        },
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
