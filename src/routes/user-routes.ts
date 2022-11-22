import { Router } from "express";
import { createUser, signIn, searchList } from "../controllers/index.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { signupSchema, signinSchema } from "../schemas/auth-schema.js";
import { authenticateToken } from "../middlewares/index.js";

export const userRoutes = Router();

userRoutes
  .post("/new", validateBody(signupSchema), createUser)
  .post("/login", validateBody(signinSchema), signIn)
  .get("/find/:username", authenticateToken, searchList);
