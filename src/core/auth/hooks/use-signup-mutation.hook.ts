import { useMutation } from '@tanstack/react-query';
import { signup } from '../auth.service';
import { TUserCreateInput } from '@/core/user/models/user.model';
import { THookHandler } from '@/core/shared/models/service-handler.model';

type TServiceResponseData<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>;

const useSignupMutation = (handlers?: THookHandler<TServiceResponseData<typeof signup>>) => {
  return useMutation({
    mutationFn: (data: TUserCreateInput) => signup(data),
    onSuccess: (data) => {
      handlers?.onSuccess?.(data);
    },
    onError(error) {
      handlers?.onError?.(error);
    },
  });
};

export default useSignupMutation;
