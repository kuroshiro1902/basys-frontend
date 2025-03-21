import { ENV } from '@/environments/environment';

export class BaseService {
  rootUrl = ENV.serverUrl;
  constructor(private rootPath: string) {
    this.rootUrl += rootPath;
  }
  url(path: string) {
    return this.rootPath + path;
  }
}
