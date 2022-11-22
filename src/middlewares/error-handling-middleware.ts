import { ApplicationError } from '../protocol.js';
import { NextFunction, Request, Response } from 'express';

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(400).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedUsernameError') {
    return res.status(409).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    return res.status(401).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(500).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
