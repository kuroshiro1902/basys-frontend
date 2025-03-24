import { ENV } from '@/environments/environment';
import { TResponse } from '../models/api-response.model';
import qs, { StringifyOptions } from 'query-string';

export class BaseService {
  private stringifyOptions: StringifyOptions = { arrayFormat: 'separator', arrayFormatSeparator: '&' };

  constructor(private rootUrl = ENV.serverUrl) {}
  url(path: string) {
    return this.rootUrl + path;
  }
  params<TParams extends Record<string, any> = {}>(params: TParams) {
    return qs.stringify(params, this.stringifyOptions);
  }
  handleResponse<TData = unknown>(res: TResponse<TData>) {
    if (res.success) {
      return res.data;
    } else {
      throw new Error(res.message ?? 'Something went wrong. Try again later.');
    }
  }

  handleError<TErrorData = unknown>(error: any) {
    const errorData = error.response?.data as TResponse<TErrorData>;
    return errorData?.data;
  }

  throwError<TData>(error: any): TData {
    const message = error.response?.data?.message ?? error?.message ?? 'Something went wrong. Try again later.';
    throw new Error(message);
  }
}
