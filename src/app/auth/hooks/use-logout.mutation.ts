import { useMutation } from '@tanstack/react-query';
import { logout } from '@/core/auth/auth.service';
import { THookHandler } from '@/core/shared/models/service-handler.model';

type TServiceResponseData<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>;

function useLogoutMutation(handler?: THookHandler<TServiceResponseData<typeof logout>>) {
  return useMutation({
    mutationFn: logout,
    onSuccess: handler?.onSuccess,
    onError: handler?.onError,
  });
}

export default useLogoutMutation;
