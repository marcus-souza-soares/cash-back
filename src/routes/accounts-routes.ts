import { Router } from "express";
import { authenticateToken } from "../middlewares/index.js";
import { getAccount } from "../controllers/index.js";

export const accountRouter = Router();

accountRouter.all("/*", authenticateToken)
  .get("/:accountId", getAccount);
