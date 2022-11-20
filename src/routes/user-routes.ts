import { Router } from "express";
import { createUser, signIn } from "../controllers/index.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { signupSchema, signinSchema } from "../schemas/auth-schema.js";

export const userRoutes = Router();

userRoutes
  .post("/new", validateBody(signupSchema), createUser)
  .post("/login", validateBody(signinSchema), signIn);
