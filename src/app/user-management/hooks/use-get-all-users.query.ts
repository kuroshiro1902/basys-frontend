import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllUsers } from '@/core/user/user.service';

const useGetAllUsers = (pageIndex = 1) => {
  return useQuery({
    queryKey: ['users', pageIndex],
    queryFn: () => getAllUsers(pageIndex),
    placeholderData: keepPreviousData,
    staleTime: 3 * 1000,
    enabled: !!pageIndex
  });
};

export default useGetAllUsers;
