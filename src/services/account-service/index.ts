import { accountRepository } from "../../repositories/accounts-repository";
import { UserParams } from "../../repositories/user-repository";

export async function creatNewAccount(userBody: Omit<UserParams, "accountId">) {
  
}

export async function getAccountById(id: number) {
  return accountRepository.findAccount(id);
}
