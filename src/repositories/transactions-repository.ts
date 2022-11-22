import { prisma } from "../config";
import { Transactions } from "@prisma/client";

export type TransactionParams = Omit<Transactions, "id" | "createdAt">

async function createTransaction(
  trasaction: TransactionParams
) {
  return prisma.transactions.create({
    data: trasaction,
  });
}

async function findTransactionsByUser(accountId: number) {
  return prisma.transactions.findMany({
    where: {
      OR: [
        {
          debitedAccountId: accountId,
        },
        {
          creditedAccountId: accountId,
        },
      ],
    },
  });
}

export const transactionRepository = {
  findTransactionsByUser,
  createTransaction
}