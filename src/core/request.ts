import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosProxyConfig } from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import { URL } from 'url';

import { linkedinApiUrl } from '../../config';
import { paramsSerializer } from '../utils/paramsSerializer';

const buildUrl = (url: string) => new URL(url, linkedinApiUrl).toString();

type ConfigFullResponse = AxiosRequestConfig & { fullResponse?: true };
type ConfigNonFullResponse = AxiosRequestConfig & { fullResponse?: false };

interface RequestOpts {
  proxy?: AxiosProxyConfig;
}

export class Request {
  request: AxiosInstance;

  constructor({ proxy }: RequestOpts = {}) {
    const userAndPass = proxy!.auth!.username + ':' + proxy!.auth!.password;
    const httpsAgent = HttpsProxyAgent({
      host: proxy!.host,
      port: proxy!.port,
      auth: userAndPass,
    });

    this.request = axios.create({
      paramsSerializer,
      withCredentials: true,
      httpsAgent,
    });
  }

  setHeaders(headers: Record<string, string>): void {
    this.request.defaults.headers = headers;
  }

  updateHeaders(headers: Record<string, string>): void {
    this.request.defaults.headers = { ...this.request.defaults.headers, ...headers };
  }

  getHeaders(): unknown {
    return this.request.defaults.headers;
  }

  async get<T>(url: string, reqConfig?: ConfigNonFullResponse): Promise<T>;
  async get<T>(url: string, reqConfig?: ConfigFullResponse): Promise<AxiosResponse<T>>;
  async get<T>(url: string, reqConfig?: ConfigFullResponse | ConfigNonFullResponse): Promise<T | AxiosResponse<T>> {
    const response = await this.request.get<T>(buildUrl(url), reqConfig);

    return reqConfig?.fullResponse ? response : response.data;
  }

  async post<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigNonFullResponse): Promise<T>;
  async post<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigFullResponse): Promise<AxiosResponse<T>>;
  async post<T>(
    url: string,
    data: string | Record<string, unknown>,
    reqConfig?: ConfigFullResponse | ConfigNonFullResponse,
  ): Promise<T | AxiosResponse<T>> {
    const response = await this.request.post<T>(buildUrl(url), data, reqConfig);

    return reqConfig?.fullResponse ? response : response.data;
  }

  async put<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigNonFullResponse): Promise<T>;
  async put<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigFullResponse): Promise<AxiosResponse<T>>;
  async put<T>(
    url: string,
    data: string | Record<string, unknown>,
    reqConfig?: ConfigFullResponse | ConfigNonFullResponse,
  ): Promise<T | AxiosResponse<T>> {
    const response = await this.request.put<T>(buildUrl(url), data, reqConfig);

    return reqConfig?.fullResponse ? response : response.data;
  }
}
