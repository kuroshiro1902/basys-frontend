import { TUser, TUserInput } from './models/user.model';
import { useMutation } from '@tanstack/react-query';
import { TServiceHandler } from '@/app/shared/models/service-handler.model';
import { apiService } from '../shared/services/api.service';
import { BaseService } from '../shared/services/base.service';

type TLoginData = { user: TUser; access_token: string };

const API_URL = '/api/auth';

export const getMe = async () => {
  const me = await apiService.get<TUser>(`${API_URL}/me`, { skipRetryAfterRenewal: true });
  return me;
};

class AuthService extends BaseService {
  constructor() {
    super('/api/auth');
  }
  private async login({ email, password }: Pick<TUserInput, 'email' | 'password'>) {
    return await apiService.post<TLoginData>(this.url('/login'), {
      email,
      password,
    });
  }

  useLoginMutation(handlers?: TServiceHandler<TLoginData>) {
    return useMutation({
      mutationFn: (cred: Pick<TUserInput, 'email' | 'password'>) => this.login(cred),
      onSuccess: (data) => {
        if (data) {
          handlers?.onSuccess?.(data);
        }
      },
      onError(error) {
        handlers?.onError?.(error);
      },
    });
  }
}

export const authService = new AuthService();
