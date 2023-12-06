import { z } from 'zod';

export const userUpdateValidationZodSchema = z.object({
  userId: z.number().positive().optional(),
  username: z.string().min(1).max(20).trim().optional(),
  password: z.string().min(1).max(20).optional(),
  fullName: z
    .object({
      firstName: z.string().min(1).max(20).trim().optional(),
      lastName: z.string().min(1).max(20).trim().optional(),
    })
    .optional(),
  age: z
    .number()
    .refine((data) => data > 0, {
      message: 'Number must be positive and not less than zero!',
    })
    .optional(),
  email: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  hobbies: z.string().array().optional(),
  address: z
    .object({
      street: z.string().trim().optional(),
      city: z.string().trim().optional(),
      country: z.string().trim().optional(),
    })
    .optional(),
  orders: z
    .array(
      z.object({
        productName: z.string().trim(),
        price: z.number().positive(),
        quantity: z.number().positive(),
      }),
    )
    .optional(),
});
