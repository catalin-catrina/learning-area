import type { OrderStatus, WhiskyStyle } from "../generated/prisma/enums";

const { prisma } = require("../lib/prisma");
import bcrypt from "bcrypt";
import usersDataSource from "../data/usersData.js";
import productsDataSource from "../data/productsData.js";
import ordersDataSource from "../data/ordersData.js";

type SeedUser = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  password: string;
};

type SeedProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  style: WhiskyStyle;
  country: string;
  region: string | null;
  ageYears: number | null;
  abv: number;
  volumeMl: number;
  priceCents: number;
  compareAtPriceCents: number | null;
  peated: boolean;
  giftBox: boolean;
  inStock: boolean;
  cask: string | null;
  tastingNotes: string[];
  description: string;
  imageUrl: string | null;
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
        phone: user.phone,
        role: user.role,
        password: passwordHash,
      },
    });
  }
  // seed products loop
  for (const product of productsData) {
    const { reviews, ...productFields } = product;
    // rating/reviewCount are derived from the seeded reviews, never typed by hand
    const reviewCount = reviews.length;
    const rating = reviewCount
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10,
        ) / 10
      : 0;
    const fields = { ...productFields, rating, reviewCount };

    await prisma.product.upsert({
      where: { id: product.id },
      // re-running the seed refreshes catalog fields without duplicating reviews
      update: fields,
      create: {
        ...fields,
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
        unitPriceCents: product.priceCents,
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
        // required + unique since the Stripe migration; deterministic so re-seeding is stable
        checkoutSessionCreationKey: `seed-order-${order.id}`,
        items: {
          create: items,
        },
      },
    });
  }

  // Seeds insert explicit ids, which bypass Postgres's autoincrement counters.
  // Move each counter past the seeded rows, or the first user/product/order
  // created through the API gets id 1 and fails on the primary key.
  for (const table of ["User", "Product", "Order"]) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "${table}"))`,
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
