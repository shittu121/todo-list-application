import { z } from 'zod';

export const UserFormValidation = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, 'Must be at least 5 characters')
    .max(15, 'Must be at most 15 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .toLowerCase()
    .min(8, 'Must be at least 8 characters')
    .max(20, 'Must be at most 20 characters')
});

export const AuthValidation = z.object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .trim()
      .toLowerCase()
  });
  

export type UserFormData = z.infer<typeof UserFormValidation>;
export type AuthData = z.infer<typeof AuthValidation>;
