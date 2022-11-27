import {
  transactionRepository,
  TransactionUserParams,
} from "../../repositories/transactions-repository.js";
import * as userService from "../user-service/index.js";
import { userNotFoundError } from "./errors.js";
import dayjs from "dayjs";

export async function createTransaction(body: TransactionUserParams) {
  const { userInId, userOutId, accountInId, accountOutId, value } = body;
  const findIn = await userService.getUserById(userInId);
  const findOut = await userService.getUserById(userOutId);

  if (!findIn || !findOut) throw userNotFoundError();
  await transactionRepository.createTransaction({
    accountInId,
    accountOutId,
    value: Number(value),
  });
}

export async function getTransactions(
  accountId: number,
  filter: any,
  date?: Date | string | any
) { 
  if (date) {
    if (filter === "all")
      return await transactionRepository.findTransactionsByUser(
        accountId,
        date
      );
    if (filter === "cash-in")
      return await transactionRepository.findTransactionsFilterCredited(
        accountId,
        date
      );
    if (filter === "cash-out")
      return await transactionRepository.findTransactionsFilterDebited(
        accountId,
       date
      );
  }
  if (filter === "all")
    return await transactionRepository.findTransactionsByUser(accountId);
  if (filter === "cash-in")
    return await transactionRepository.findTransactionsFilterCredited(
      accountId
    );
  if (filter === "cash-out")
    return await transactionRepository.findTransactionsFilterDebited(accountId);
}
