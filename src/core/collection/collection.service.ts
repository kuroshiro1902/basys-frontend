import { apiService } from '../shared/services/api.service';
import { TCollection, TCollectionCreateInput, TCollectionQueryInput, TCollectionUpdate } from './collection.model';
import { TPageData } from '../shared/models/paging.model';
import qs from 'query-string';
const API_URL = '/api/collection';

// Lấy danh sách collections với phân trang và tìm kiếm
const getCollections = async (params: TCollectionQueryInput) => {
  return await apiService.get<TPageData<TCollection>>(`${API_URL}?${qs.stringify(params)}`);
};

// Tạo collection mới
const createCollection = async (data: TCollectionCreateInput) => {
  const collection = await apiService.post<TCollection>(API_URL, data);
  return collection;
};

// Cập nhật collection
const updateCollection = async (id: TCollection['id'], data: TCollectionUpdate) => {
  const collection = await apiService.patch<TCollection>(`${API_URL}/${id}`, {
    ...data,
    description: data.description ?? undefined,
  } as TCollectionUpdate);
  return collection;
};

// Xóa collection
const deleteCollection = async (id: TCollection['id']) => {
  const collection = await apiService.delete<TCollection>(`${API_URL}/${id}`);
  return collection;
};

// Lấy collection theo id
const getCollectionById = async (id: TCollection['id']) => {
  const collection = await apiService.get<TCollection>(`${API_URL}/${id}`);
  return collection;
};

export const collectionService = {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionById,
};
