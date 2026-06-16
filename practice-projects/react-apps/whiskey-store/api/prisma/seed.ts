const { PrismaClient } = require("../generated/prisma");
const usersData = require("../data/usersData");
const productsData = require("../data/productsData");
const ordersData = require("../data/ordersData");

const prisma = new PrismaClient();

async function main() {
  // seed users loop
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        password: user.password,
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
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        ...orderFields,
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
