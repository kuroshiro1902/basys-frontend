import { TCollection } from '@/core/collection/collection.model';
import { collectionService } from '@/core/collection/collection.service';
import { useQuery } from '@tanstack/react-query';

export const GET_COLLECTION_BY_ID_QUERY_KEY = (id: TCollection['id']) => ['collection', id];

export const useGetCollectionById = (id: TCollection['id']) => {
  return useQuery({
    queryKey: GET_COLLECTION_BY_ID_QUERY_KEY(id),
    queryFn: () => collectionService.getCollectionById(id),
    staleTime: 2 * 1000,
    enabled: !!id,
  });
};
