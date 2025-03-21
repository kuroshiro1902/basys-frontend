import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '@/environments/environment';
import { useAuthStore } from '@/app/auth/auth.store';
import { TUser } from '@/app/auth/models/user.model';
import qs, { StringifyOptions } from 'query-string';
import { TResponse } from '../models/api-response.model';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];
  private stringifyOptions: StringifyOptions = { arrayFormat: 'separator', arrayFormatSeparator: '&' };

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.serverUrl,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Gửi cookie để lấy refresh token
    });

    this.setupInterceptors();
  }

  // getInstance(): AxiosInstance {
  //   return this.axiosInstance;
  // }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const authStore = useAuthStore.getState();
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          const errorCode = (error.response?.data as any)?.errorCode;

          if (errorCode === 'TOKEN_EXPIRED') {
            if (this.isRefreshing) {
              return new Promise((resolve) => {
                this.refreshSubscribers.push((newAccessToken) => {
                  originalRequest!.headers!['Authorization'] = `Bearer ${newAccessToken}`;
                  resolve(this.axiosInstance(originalRequest!));
                });
              });
            }

            originalRequest!._retry = true;
            this.isRefreshing = true;

            try {
              const { access_token } = await this.refreshAccessToken();
              this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
              authStore.setAccessToken(access_token);
              this.notifySubscribers(access_token);
              return this.axiosInstance(originalRequest!);
            } catch (refreshError: any) {
              authStore.logout();
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          }
        }
        return Promise.reject(error);
      },
    );
  }

  private async refreshAccessToken() {
    const response = await axios.post<{ access_token: string; user: TUser }>(
      `${ENV.serverUrl}/api/auth/access-token`,
      {},
      { withCredentials: true },
    );
    return response.data;
  }

  // private async refreshRefreshToken() {
  //   const response = await axios.post<{ access_token: string; user: TUser }>(
  //     `${ENV.serverUrl}/api/auth/refresh-token`,
  //     {},
  //     { withCredentials: true },
  //   );
  //   return response.data;
  // }

  private notifySubscribers(newAccessToken: string) {
    this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
    this.refreshSubscribers = [];
  }

  async get<TData = unknown, TParams extends Record<string, any> = {}>(url: string, params?: TParams) {
    try {
      const queryString = params ? `?${qs.stringify(params, this.stringifyOptions)}` : '';
      const { data } = await this.axiosInstance.get<TResponse<TData>>(`${url}${queryString}`);
      return this.handleResponse(data);
    } catch (error) {
      return this.handleError<TData>(error);
    }
  }

  async delete<TData = unknown, TParams extends Record<string, any> = {}>(url: string, params?: TParams) {
    try {
      const queryString = params ? `?${qs.stringify(params, this.stringifyOptions)}` : '';
      const { data } = await this.axiosInstance.delete<TResponse<TData>>(`${url}${queryString}`);
      return this.handleResponse(data);
    } catch (error) {
      return this.handleError<TData>(error);
    }
  }

  async post<TData = unknown, TBody = unknown, TParams extends Record<string, any> = {}>(
    url: string,
    body?: TBody,
    params?: TParams,
  ) {
    try {
      const queryString = params ? `?${qs.stringify(params, this.stringifyOptions)}` : '';
      const { data } = await this.axiosInstance.post<TResponse<TData>>(`${url}${queryString}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.handleError<TData>(error);
    }
  }

  async put<TData = unknown, TBody = unknown, TParams extends Record<string, any> = {}>(
    url: string,
    body?: TBody,
    params?: TParams,
  ) {
    try {
      const queryString = params ? `?${qs.stringify(params, this.stringifyOptions)}` : '';
      const { data } = await this.axiosInstance.put<TResponse<TData>>(`${url}${queryString}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.handleError<TData>(error);
    }
  }

  async patch<TData = unknown, TBody = unknown, TParams extends Record<string, any> = {}>(
    url: string,
    body?: TBody,
    params?: TParams,
  ) {
    try {
      const queryString = params ? `?${qs.stringify(params, this.stringifyOptions)}` : '';
      const { data } = await this.axiosInstance.patch<TResponse<TData>>(`${url}${queryString}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.handleError<TData>(error);
    }
  }

  private handleResponse<TData = unknown>(res: TResponse<TData>) {
    if (res.success) {
      return res.data;
    } else {
      throw new Error(res.message ?? 'Something went wrong. Try again later.');
    }
  }
  private handleError<TData = unknown>(error: any): TData {
    throw new Error(error.response.data.message ?? 'Something went wrong. Try again later.');
  }
}

export const apiService = new ApiService();
