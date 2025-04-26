import { useQuery, useMutation } from '@tanstack/react-query';
import { user-managementService } from '../services/user-management.service';

export const user-managementHook = {
  useGetUser-managementQuery: () => {
    return useQuery({
      queryKey: ['user-management'],
      queryFn: () => user-managementService.get({}),
    });
  },

  usePostUser-managementMutation: () => {
    return useMutation({
      mutationFn: (data) => user-managementService.post(data),
      // Add onSuccess, onError, etc. as needed
    });
  },
};
