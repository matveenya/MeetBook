import { z } from 'zod';
import { AUTH_MESSAGES } from '@/constants/authMessages';

export const loginSchema = z.object({
  email: z
    .string(AUTH_MESSAGES.REQUIRED_EMAIL)
    .email(AUTH_MESSAGES.INVALID_EMAIL)
    .min(1, AUTH_MESSAGES.REQUIRED_EMAIL),
  password: z.string(AUTH_MESSAGES.REQUIRED_PASSWORD).min(6, AUTH_MESSAGES.INVALID_PASSWORD),
});

export const authSchema = z
  .object({
    fullName: z.string(AUTH_MESSAGES.REQUIRED_FULLNAME).min(4, AUTH_MESSAGES.INVALID_FULLNAME),
    email: z
      .string(AUTH_MESSAGES.REQUIRED_EMAIL)
      .email(AUTH_MESSAGES.INVALID_EMAIL)
      .min(1, AUTH_MESSAGES.REQUIRED_EMAIL),
    password: z.string(AUTH_MESSAGES.REQUIRED_PASSWORD).min(6, AUTH_MESSAGES.INVALID_PASSWORD),
    confirmPassword: z
      .string(AUTH_MESSAGES.REQUIRED_CONFIRMPASSWORD)
      .min(6, AUTH_MESSAGES.INVALID_CONFIRMPASSWORD),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.INVALID_CONFIRMPASSWORD,
    path: ['confirmPassword'],
  });

export type AuthSchema = z.infer<typeof authSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
