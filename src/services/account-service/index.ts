import { accountRepository } from "../../repositories/accounts-repository.js";
import { UserParams } from "../../repositories/user-repository";

export async function getAccountById(id: number) {
  return accountRepository.findAccount(id);
}
