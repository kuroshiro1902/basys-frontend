import { TTimestamp } from '@/core/shared/models/timestamp.model';
import { z } from 'zod';

const ZPassword = z.string().min(6).max(255).trim();

export const ZUser = z.object({
  id: z.number().int().positive(),
  name: z.string().min(5).max(255),
  email: z.string().email(),
  avatarImg: z.string().optional(),
  bgImg: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export const ZUserCreateInput = ZUser.pick({
  name: true,
  email: true,
  avatarImg: true,
  bgImg: true,
})
  .extend({
    password: ZPassword,
    confirmPassword: ZPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export const ZUserLoginInput = ZUser.pick({
  email: true,
})
  .extend({
    password: ZPassword,
  })
  .refine((data) => data.password.length > 0, {
    message: 'Mật khẩu không được để trống',
    path: ['password'],
  });

export type TUser = z.infer<typeof ZUser> & TTimestamp;
export type TUserCreateInput = z.infer<typeof ZUserCreateInput>;
export type TUserLoginInput = z.infer<typeof ZUserLoginInput>;
