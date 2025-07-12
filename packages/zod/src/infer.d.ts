import { z } from "zod/v4";
import { signupSchema,signinSchema } from './types.ts'

export type SignupData = z.infer<typeof signupSchema>;
export type SigninData = z.infer<typeof signinSchema>;

export * from "./infer";