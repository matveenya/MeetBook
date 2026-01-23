import { z } from 'zod';
import {
  REQUIRED_EMAIL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  REQUIRED_FULLNAME_MESSAGE,
  INVALID_FULLNAME_MESSAGE,
  REQUIRED_CONFIRMPASSWORD_MESSAGE,
  INVALID_CONFIRMPASSWORD_MESSAGE,
} from './constants';

export const authSchema = z
  .object({
    fullName: z.string(REQUIRED_FULLNAME_MESSAGE).min(4, INVALID_FULLNAME_MESSAGE),
    email: z
      .string(REQUIRED_EMAIL_MESSAGE)
      .email(INVALID_EMAIL_MESSAGE)
      .min(1, REQUIRED_EMAIL_MESSAGE),
    password: z.string(REQUIRED_PASSWORD_MESSAGE).min(6, INVALID_PASSWORD_MESSAGE),
    confirmPassword: z
      .string(REQUIRED_CONFIRMPASSWORD_MESSAGE)
      .min(6, INVALID_CONFIRMPASSWORD_MESSAGE),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: INVALID_CONFIRMPASSWORD_MESSAGE,
    path: ['confirmPassword'],
  });

export type AuthSchema = z.infer<typeof authSchema>;
