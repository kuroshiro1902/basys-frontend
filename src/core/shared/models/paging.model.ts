import { z } from 'zod';

export interface TPageData<T> {
  data: T[];
  pageInfo: TPageInfo;
}

export type TPageInfo = {
  pageIndex?: number;
  pageSize?: number;
  hasNextPage?: boolean;
  totalPage?: number;
};

export const ZPageInput = (defaultPageSize = 20) =>
  z.object({
    pageIndex: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).default(1),
    pageSize: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).default(defaultPageSize),
  });
