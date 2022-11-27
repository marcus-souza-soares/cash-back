import { Request, Response } from "express";
import * as transactionService from "../services/transaction-service/index.js";

export async function createTransaction(req: Request, res: Response) {
  const transaction = req.body;
  await transactionService.createTransaction(transaction);
  return res.status(200).send("Ok");
}

export async function getTransactions(req: Request, res: Response) {
  const { filter, date, accountId } = req.query;
  console.log(req.query);
  const result = await transactionService.getTransactions(Number(accountId), filter, date)
  res.status(200).send(result);
}
