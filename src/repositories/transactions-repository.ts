import { prisma } from "../config/index.js";
import { Transactions } from "@prisma/client";
import dayjs from "dayjs";

export type TransactionParams = Omit<Transactions, "id" | "createdAt">;

export interface TransactionUserParams {
  userInId: number;
  userOutId: number;
  accountInId: number;
  accountOutId: number;
  value: number;
}

async function createTransaction(trasaction: {
  accountInId: number;
  accountOutId: number;
  value: number;
}) {
  return await prisma.$transaction(async (prisma) => {
    await prisma.accounts.update({
      where: {
        id: trasaction.accountInId,
      },
      data: {
        balance: {
          increment: trasaction.value,
        },
      },
    });
    await prisma.accounts.update({
      where: {
        id: trasaction.accountOutId,
      },
      data: {
        balance: {
          decrement: trasaction.value,
        },
      },
    });
    await prisma.transactions.create({
      data: {
        debitedAccountId: trasaction.accountOutId,
        creditedAccountId: trasaction.accountInId,
        value: trasaction.value,
      },
    });
  });
}

async function findTransactionsByUser(accountId: number, date?: string) {
  if (date)
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
        createdAt: {
          lte: dayjs(date).add(1, "day").toJSON(),
          gte: dayjs(date).toJSON(),
        },
      },
      include: {
        credited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
        debited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
      },
    });
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
    include: {
      credited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
      debited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
    },
  });
}

async function findTransactionsFilterDebited(accountId: number, date?: string) {
  if (date)
    return prisma.transactions.findMany({
      where: {
        debitedAccountId: accountId,
        createdAt: {
          lte: dayjs(date).add(1, "day").toJSON(),
          gte: dayjs(date).toJSON(),
        },
      },
      include: {
        credited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
        debited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
      },
    });
  return prisma.transactions.findMany({
    where: {
      debitedAccountId: accountId,
    },
    include: {
      credited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
      debited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
    },
  });
}
async function findTransactionsFilterCredited(
  accountId: number,
  date?: string
) {
  if (date)
    return prisma.transactions.findMany({
      where: {
        creditedAccountId: accountId,
        createdAt: {
          lte: dayjs(date).add(1, "day").toJSON(),
          gte: dayjs(date).toJSON(),
        },
      },
      include: {
        credited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
        debited: {
          include: {
            user: {
              select: {
                username: true,
                password: false,
              },
            },
          },
        },
      },
    });
  return prisma.transactions.findMany({
    where: {
      creditedAccountId: accountId,
    },
    include: {
      credited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
      debited: {
        include: {
          user: {
            select: {
              username: true,
              password: false,
            },
          },
        },
      },
    },
  });
}

export const transactionRepository = {
  findTransactionsByUser,
  createTransaction,
  findTransactionsFilterDebited,
  findTransactionsFilterCredited,
};
