import {
  userRepository,
  UserParams,
} from "../src/repositories/user-repository.js";
import { faker } from "@faker-js/faker";

const userList: Array<UserParams | null> = [];
let cont: number = 0;

while (cont < 4) {
  const _newUser: UserParams = {
    username: "@" + faker.internet.userName(),
    password: faker.internet.password(10),
  };
  userList.push(_newUser);
  cont++;
}

async function seed(): Promise<void> {
  userList.forEach(async (u) => {
    await userRepository.createUser(u);
  });
}

seed();


