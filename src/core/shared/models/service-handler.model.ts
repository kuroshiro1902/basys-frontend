export type THookHandler<T = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};
