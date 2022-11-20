import * as userService from "../services/user-service/index.js";
import { Request, Response } from "express";
import { UserParams} from "../repositories/user-repository.js";

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  await userService.createUser(user);
  return res.status(201).send("OK!");
}


export async function signIn(req: Request, res: Response) {
  const { username, password } = req.body as UserParams;
  const result = await userService.signIn({ username, password });
  res.status(200).send(result);
}
