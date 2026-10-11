const { prisma } = require("../lib/prisma");
const bcrypt = require("bcrypt");
const usersData = require("../data/usersData");
const productsData = require("../data/productsData");
const ordersData = require("../data/ordersData");

async function main() {
  // seed users loop
  for (const user of usersData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    const passwordHash = await bcrypt.hash(user.password, 10);
    const seededPasswordHash =
      existingUser?.password === user.password
        ? passwordHash
        : undefined;

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
          create: reviews.map((r: any) => ({
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
    const status = {
      pending: "PENDING",
      shipped: "SHIPPED",
      completed: "DELIVERED",
    }[order.status];
    if (!status) {
      throw new Error(`Unsupported seed order status: ${order.status}`);
    }

    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        ...orderFields,
        status,
        createdAt: new Date(createdAt),
        items: {
          create: products.map((p: any) => ({
            quantity: p.quantity,
            productId: p.productId,
          })),
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
