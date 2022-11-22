import { ApplicationError } from '../../protocol.js';

export function duplicatedUsernameError(): ApplicationError {
  return {
    name: 'DuplicatedUsernameError',
    message: 'There is already an user with given username',
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'username or password are incorrect',
  };
}
