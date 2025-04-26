export type TResponse<T = unknown> =
  | {
      data: T;
      statusCode?: number;
      success: true;
      message?: string;
    }
  | {
      data?: T | null;
      statusCode?: number;
      success: false;
      message?: string;
    };

// export type TErrorResponse<T = unknown> = Error & {
//   statusCode: number;
//   success: false;
//   message: string;
//   data?: T;
// };
