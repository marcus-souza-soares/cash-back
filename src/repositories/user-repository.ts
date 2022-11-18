import { prisma } from "../config";
import { User } from "@prisma/client";

export type UserParams = Omit<User, "id">

async function createUser(user: UserParams) {
  return prisma.user.create({
    data: user,
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
