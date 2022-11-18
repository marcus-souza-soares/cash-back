import joi from "joi";
import { UserParams } from "../repositories";

type confirmPassword = {
  confirmPassword: string;
};

export const signupSchema = joi.object<UserParams & confirmPassword>({
  username: joi.string().min(3).required(),
  password: joi
    .string()
    .min(8)
    .regex(/[A-Z]{1,}/)
    .regex(/\d{1,}/)
    .required(),
  confirmPassword: joi.ref("password"),
});

export const signinSchema = joi.object<UserParams>({
  username: joi.string().min(3).required(),
  password: joi
    .string()
    .min(8)
    .regex(/[A-Z]{1,}/)
    .regex(/\d{1,}/)
    .required(),
});
