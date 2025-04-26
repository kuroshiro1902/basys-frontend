import { useQuery, useMutation } from '@tanstack/react-query';
import { permissionService } from '../services/permission.service';

export const permissionHook = {
  useGetPermissionQuery: () => {
    return useQuery({
      queryKey: ['permission'],
      queryFn: () => permissionService.get({}),
    });
  },

  usePostPermissionMutation: () => {
    return useMutation({
      mutationFn: (data) => permissionService.post(data),
      // Add onSuccess, onError, etc. as needed
    });
  },
};
