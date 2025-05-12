import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { collectionService } from '@/core/collection/collection.service';
import { TCollectionQueryInput } from '@/core/collection/collection.model';

export const GET_COLLECTIONS_QUERY_KEY = 'collections';
export const useGetCollections = (params: TCollectionQueryInput) => {
  return useQuery({
    queryKey: [GET_COLLECTIONS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => collectionService.getCollections(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 1000,
  });
};

