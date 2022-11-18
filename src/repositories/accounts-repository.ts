import { prisma } from "../config";

async function createAcconunt(defaultBalance = 100) {
  return prisma.accounts.create({
    data: {
      balance: defaultBalance,
    },
  });
}

async function findAccount(id: number) {
  return prisma.accounts.findUnique({
    where: {
      id,
    },
  });
}


