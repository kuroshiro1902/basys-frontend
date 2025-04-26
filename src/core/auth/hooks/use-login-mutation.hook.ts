import { useMutation } from '@tanstack/react-query';
import { TUserInput } from '../models/user.model';
import { THookHandler } from '@/core/shared/models/service-handler.model';
import { login } from '../auth.service';

type TServiceResponseData<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>;

const useLoginMutation = (handlers?: THookHandler<TServiceResponseData<typeof login>>) => {
  return useMutation({
    mutationFn: (cred: Pick<TUserInput, 'email' | 'password'>) => login(cred),
    onSuccess: (data) => {
      if (data) {
        handlers?.onSuccess?.(data);
      }
    },
    onError(error) {
      handlers?.onError?.(error);
    },
  });
};

export default useLoginMutation;
