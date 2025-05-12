import { z } from 'zod';
import { ZPageInput } from '../shared/models/paging.model';

export const ZCollection = z.object({
  id: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  name: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9\s_-]+$/,
      'Tên bộ sưu tập chỉ được chứa các ký tự a-z, A-Z, 0-9, dấu cách, dấu gạch ngang và dấu gạch dưới!',
    )
    .min(1)
    .max(100),
  description: z.string().trim().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const ZCollectionCreate = ZCollection.pick({
  name: true,
  description: true,
});
export const ZCollectionUpdate = ZCollection.pick({
  name: true,
  description: true,
}).partial();

export const ZCollectionQuery = z
  .object({
    search: z.string().trim().max(100).optional(),
  })
  .merge(ZPageInput());

export type TCollection = z.infer<typeof ZCollection>;
export type TCollectionCreateInput = z.input<typeof ZCollectionCreate>;
export type TCollectionCreate = z.infer<typeof ZCollectionCreate>;
export type TCollectionUpdateInput = z.input<typeof ZCollectionUpdate>;
export type TCollectionUpdate = z.infer<typeof ZCollectionUpdate>;
export type TCollectionQueryInput = z.input<typeof ZCollectionQuery>;
export type TCollectionQuery = z.infer<typeof ZCollectionQuery>;
