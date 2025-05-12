import { TCollectionCreate } from '@/core/collection/collection.model';
import { collectionService } from '@/core/collection/collection.service';
import { queryClient } from '@/query-client';
import { useMutation } from '@tanstack/react-query';
import { GET_COLLECTIONS_QUERY_KEY } from './use-get-collections.query';

const useCreateCollectionMutation = () => {
  const mutation = useMutation({
    mutationKey: ['createCollection'],
    mutationFn: (data: TCollectionCreate) => collectionService.createCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_COLLECTIONS_QUERY_KEY] });
    },
  });

  return mutation;
};

export default useCreateCollectionMutation;
