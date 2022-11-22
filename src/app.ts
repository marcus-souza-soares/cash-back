import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv } from "./config/envs.js";
import { connectDb, disconnectDB } from "./config/database.js";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware.js";

import { userRoutes, accountRouter } from "./routes/index.js"

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/user", userRoutes)
  .use("/account", accountRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
