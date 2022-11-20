import { prisma } from "../config/index.js";
import { User } from "@prisma/client";

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
export const userRepository = {
  createUser,
  findUserByCredentials,
  findUserByUsername,
};
