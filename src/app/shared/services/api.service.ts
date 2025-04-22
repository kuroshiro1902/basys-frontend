import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { TUser, useAuthStore } from '@/app/auth';
import { TResponse } from '../models/api-response.model';
import { BaseService } from './base.service';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type TRenewAccessTokenData = {
  access_token: string;
  user: TUser;
};

class ApiService extends BaseService {
  private axiosPlainInstance: AxiosInstance; // For non-interceptor requests
  private axiosInstance: AxiosInstance;
  private renewAccessTokenPromise: Promise<TRenewAccessTokenData> | null = null;

  private defaultHeaders: RawAxiosRequestHeaders = { 'Content-Type': 'application/json' };
  constructor() {
    super();
    this.axiosInstance = axios.create({
      headers: this.defaultHeaders,
      withCredentials: true,
    });

    this.axiosPlainInstance = axios.create({
      headers: this.defaultHeaders,
      withCredentials: true,
    });

    this.setupInterceptors(this.axiosInstance);
  }

  private setupInterceptors(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use(
      (config) => {
        const access_token = useAuthStore.getState().access_token();
        if (access_token) {
          config.headers = new AxiosHeaders({
            ...config.headers,
            Authorization: `Bearer ${access_token}`,
          });
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const authStore = useAuthStore.getState();
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          const errorData = (error.response?.data as TResponse<string>)?.data;
          if (errorData === 'VALID_ACCESS_TOKEN_REQUIRED') {
            originalRequest._retry = true;

            try {
              if (!this.renewAccessTokenPromise) {
                this.renewAccessTokenPromise = this.handleRenewAccessToken();
              }

              const newToken = await this.renewAccessTokenPromise;

              // Clone và cập nhật config mới để tránh mutation
              const newConfig = {
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newToken}`,
                },
              };

              return this.axiosInstance(newConfig);
            } catch (refreshError) {
              authStore.logout();
              return Promise.reject(refreshError);
            } finally {
              this.renewAccessTokenPromise = null;
            }
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // async verifyAccessToken() {
  //   const access_token = useAuthStore.getState().access_token();
  //   try {
  //     const {
  //       data: { data: user },
  //     } = await this.axiosPlainInstance.post<TResponse<TUser>>(
  //       this.url(`/api/auth/verify`),
  //       {},
  //       {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: access_token ? `Bearer ${access_token}` : undefined,
  //         },
  //       },
  //     );
  //     if (user) {
  //       useAuthStore.setState({ user });
  //     }
  //   } catch (error) {
  //     const axiosErrorData = this.handleError<string>(error);
  //     if (axiosErrorData.data === 'VALID_ACCESS_TOKEN_REQUIRED') {
  //       await this.handleRenewAccessToken();
  //     }
  //   }
  // }

  private async handleRenewAccessToken(): Promise<TRenewAccessTokenData> {
    try {
      const { data } = await this.axiosPlainInstance.post<TResponse<TRenewAccessTokenData>>(
        `/api/auth/access-token`,
      );
      const { access_token, user } = this.handleResponse(data);
      useAuthStore.getState().setUser(access_token);
      return { access_token, user };
    } catch (error) {
      useAuthStore.getState().logout();
      throw new Error('Failed to refresh token');
    }
  }

  async get<TData = unknown>(url: string) {
    try {
      const { data } = await this.axiosInstance.get<TResponse<TData>>(`${url}`);
      return this.handleResponse(data);
    } catch (error) {
      return this.throwError<TData>(error);
    }
  }

  async delete<TData = unknown>(url: string) {
    try {
      const { data } = await this.axiosInstance.delete<TResponse<TData>>(`${url}`);
      return this.handleResponse(data);
    } catch (error) {
      return this.throwError<TData>(error);
    }
  }

  async post<TData = unknown, TBody = unknown>(url: string, body?: TBody) {
    try {
      const { data } = await this.axiosInstance.post<TResponse<TData>>(`${url}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.throwError<TData>(error);
    }
  }

  async put<TData = unknown, TBody = unknown>(url: string, body?: TBody) {
    try {
      const { data } = await this.axiosInstance.put<TResponse<TData>>(`${url}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.throwError<TData>(error);
    }
  }

  async patch<TData = unknown, TBody = unknown>(url: string, body?: TBody) {
    try {
      const { data } = await this.axiosInstance.patch<TResponse<TData>>(`${url}`, body);
      return this.handleResponse(data);
    } catch (error) {
      return this.throwError<TData>(error);
    }
  }
}

export const apiService = new ApiService();
