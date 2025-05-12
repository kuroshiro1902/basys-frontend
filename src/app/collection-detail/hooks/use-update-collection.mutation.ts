import { TCollection, TCollectionUpdate } from '@/core/collection/collection.model';
import { collectionService } from '@/core/collection/collection.service';
import { queryClient } from '@/query-client';
import { useMutation } from '@tanstack/react-query';
import { GET_COLLECTION_BY_ID_QUERY_KEY } from './use-get-collection-by-id.query';

export const UPDATE_COLLECTION_MUTATION_KEY = (id: TCollection['id']) => ['updateCollection', id];

export const useUpdateCollectionMutation = (id: TCollection['id']) => {
  const mutation = useMutation({
    mutationKey: UPDATE_COLLECTION_MUTATION_KEY(id),
    mutationFn: (collection: TCollectionUpdate) => collectionService.updateCollection(id, collection),
    onSuccess: (updatedCollection) => {
      queryClient.setQueryData(GET_COLLECTION_BY_ID_QUERY_KEY(id), updatedCollection);
    },
  });

  return mutation;
};
