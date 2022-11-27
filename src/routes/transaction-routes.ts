import { Router } from "express";
import { authenticateToken } from "../middlewares/index.js";
import { createTransaction, getTransactions } from "../controllers/index.js";

export const transactionRouter = Router();

transactionRouter.all("/*", authenticateToken)
  .post("/new", createTransaction)
  .get("/", getTransactions);
