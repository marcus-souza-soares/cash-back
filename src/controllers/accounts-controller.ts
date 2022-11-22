import { Request, Response } from "express";
import * as accountService from "../services/account-service/index.js";

export async function getAccount(req: Request, res: Response) {
  const { accountId } = req.params;
  const _account = await accountService.getAccountById(parseInt(accountId));
  return res.status(200).send(_account);
}
