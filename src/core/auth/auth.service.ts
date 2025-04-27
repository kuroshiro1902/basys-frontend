import { apiService } from '../shared/services/api.service';
import { TUser, TUserCreateInput } from '../user/models/user.model';

type TLoginData = { user: TUser; access_token: string };

const API_URL = '/api/auth';

export const getMe = async () => {
  const me = await apiService.get<TUser>(`${API_URL}/me`, { skipRetryAfterRenewal: true });
  return me;
};

export const login = async ({ email, password }: Pick<TUserCreateInput, 'email' | 'password'>) => {
  return await apiService.post<TLoginData>(`${API_URL}/login`, {
    email,
    password,
  });
};

export const signup = async (userInput: TUserCreateInput) => {
  return await apiService.post<TUser>(`${API_URL}/signup`, userInput);
};
