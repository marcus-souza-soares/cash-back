import { userRepository } from "../../repositories/user-repository.js";
import { UserParams } from "../../repositories/user-repository.js";
import { duplicatedUsernameError, invalidCredentialsError } from "./errors.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function createUser(
  userBody: UserParams & { confirmPassword: string }
) {
  const { username, password } = userBody;
  const resolveUser = await userRepository.findUserByUsername(username);
  if (!!resolveUser) throw duplicatedUsernameError();
  const hashedPassword = await bcrypt.hash(password, 12);
  return await userRepository.createUser({
    username,
    password: hashedPassword,
  });
}

export async function signIn(userBody: UserParams) {
  const { username, password } = userBody;
  const user = await getUserOrFail(username);
  await validatePasswordOrFail(password, user.password);
  const token = await createSession(user.id);
  delete user.password;
  return {
    user,
    token,
  };
}

async function getUserOrFail(username: string) {
  const user = await userRepository.findUserByUsername(username);
  if (!user) throw invalidCredentialsError();
  return user;
}

async function createSession(userId: number) {
  const config = { expiresIn: process.env.EXPIRES_TOKEN || "24h" };
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, config);
  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export async function searchList(username: string) {
  if (!username) return userRepository.getUsers();
  return await userRepository.searchList(username);
}
