import { ApplicationError } from '../../protocol.js';

export function userNotFoundError(): ApplicationError {
  return {
    name: 'userNotFoundError',
    message: "user don't not exsists",
  };
}
