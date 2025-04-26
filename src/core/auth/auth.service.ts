import { TUser, TUserInput } from './models/user.model';
import { apiService } from '../shared/services/api.service';

type TLoginData = { user: TUser; access_token: string };

const API_URL = '/api/auth';

export const getMe = async () => {
  const me = await apiService.get<TUser>(`${API_URL}/me`, { skipRetryAfterRenewal: true });
  return me;
};

export const login = async ({ email, password }: Pick<TUserInput, 'email' | 'password'>) => {
  return await apiService.post<TLoginData>(`${API_URL}/login`, {
    email,
    password,
  });
};
