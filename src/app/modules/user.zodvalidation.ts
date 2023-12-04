import { z } from 'zod';

export const userValidationZodSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1).max(20).trim(),
  password: z.string().min(1).max(20).trim(),
  fullName: z.object({
    firstName: z.string().min(1).max(20).trim(),
    lastName: z.string().min(1).max(20).trim(),
  }),
  age: z.number(),
  email: z.string().min(1).max(20).trim(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: z.object({
    street: z.string().trim(),
    city: z.string().trim(),
    country: z.string().trim(),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string().trim(),
        price: z.number().positive(),
        quantity: z.number().positive(),
      }),
    )
    .default([]),
});
