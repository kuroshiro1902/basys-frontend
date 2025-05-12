import { TCollection } from '@/core/collection/collection.model';
import { collectionService } from '@/core/collection/collection.service';
import { useMutation } from '@tanstack/react-query';

export const DELETE_COLLECTION_MUTATION_KEY = (id: TCollection['id']) => ['deleteCollection', id];

export const useDeleteCollectionMutation = (id: TCollection['id']) => {
  return useMutation({
    mutationKey: DELETE_COLLECTION_MUTATION_KEY(id),
    mutationFn: () => collectionService.deleteCollection(id),
  });
};
