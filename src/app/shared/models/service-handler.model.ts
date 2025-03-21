export type TServiceHandler<T = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};
