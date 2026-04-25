import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("12345678", 10);

  await prisma.user.create({
    data: {
      nom: "Doe",
      prenom: "John",
      email: "john@gmail.com",
      password: hash,
    },
  });

  console.log("Seed OK 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
