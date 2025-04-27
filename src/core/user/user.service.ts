import { TUser } from '../user/models/user.model';
import { apiService } from '../shared/services/api.service';
import { querySerializer } from '@/utils/query-serializer.util';
import { TPageData } from '../shared/models/paging.model';
const API_URL = '/api/user';

export const getAllUsers = async (pageIndex = 1) => {
  const users = await apiService.get<TPageData<TUser>>(`${API_URL}/all?${querySerializer({ pageIndex })}`);
  return users;
};
