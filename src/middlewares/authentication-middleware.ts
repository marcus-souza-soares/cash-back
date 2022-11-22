import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { unauthorizedError } from "../errors/index.js";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("x-acess-token");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.locals.userId = userId as any | string;
    req.userId = userId;

    return next();
  } catch (err) {
    console.error(err);
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(401).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
