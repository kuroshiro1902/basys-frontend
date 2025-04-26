import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  avatarImg: z.string().optional(),
  bgImg: z.string().optional(),
  permissions: z.array(z.string()),
});

export const UserInputSchema = z.object({
  name: UserSchema.shape.name.trim().min(5).max(255),
  email: UserSchema.shape.email.trim(),
  password: z.string().trim().min(6).max(255),
});

export type TUser = z.infer<typeof UserSchema>;
export type TUserInput = z.input<typeof UserInputSchema>;
