import { prisma } from "../config/index.js";
import { PrismaPromise, User } from "@prisma/client";

export type UserParams = Omit<User, "id" | "accountId">;

async function createUser(userBody: UserParams) {
  return await prisma.$transaction(async (prisma) => {
    const _account = await prisma.accounts.create({
      data: {
        balance: 100,
      },
    });
    await prisma.user.create({
      data: {
        ...userBody,
        accountId: _account.id,
      },
    });
  });
}

async function findUserByCredentials(user: UserParams) {
  return prisma.user.findFirst({
    where: {
      ...user,
    },
  });
}

async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

async function searchList(name: string) {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: name,
        mode: "insensitive",
      },
    },
    take: 10,
    orderBy: {
      username: "asc",
    },
  });
}

async function getUsers() {
  return await prisma.user.findMany({
    take: 10,
  });
}

export const userRepository = {
  getUsers,
  searchList,
  createUser,
  findUserByCredentials,
  findUserByUsername,
};
