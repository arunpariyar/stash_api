import mockData from "./dev-data/mock-data";
import prisma from "../config/db";

async function main() {
  //first start with deleting all entries of transaction
  await prisma.transaction.deleteMany();

  //then seed the transactions again
  for (const transaction of mockData.transactions) {
    await prisma.transaction.create({ data: transaction });
  }

  await prisma.pot.deleteMany();

  for (const pot of mockData.pots) {
    await prisma.pot.create({ data: pot });
  }
}

main()
  .catch((error) => {
    console.log("There was problem when seeding the database 🔥");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
