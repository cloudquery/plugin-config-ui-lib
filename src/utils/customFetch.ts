import { cloudQueryApiBaseUrl } from './constants';

export interface APIError {
  data: any;
  message: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  payload: any;
  status: number;
}

export interface CustomFetchConfig {
  credentials?: 'include' | 'omit' | 'same-origin';
  data?: unknown;
  headers?: Record<string, string>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  signal?: AbortSignal;
  streamData?: boolean;
  url: string;
}

export const customFetch = async <T>(
  config: CustomFetchConfig,
): Promise<{
  data: T;
  headers: Headers;
  response: Response;
  status: number;
  statusText: string;
}> => {
  const { data, headers, method, params, signal, streamData, url } = config;

  let searchParamsStr = '';
  for (const [key, value] of Object.entries(params || {})) {
    searchParamsStr += Array.isArray(value)
      ? `${(value as string[]).map((v) => `${key}=${encodeURIComponent(v)}`).join('&')}&`
      : `${key}=${encodeURIComponent(value as string)}&`;
  }

  const urlWithSearchParams = `${url}${searchParamsStr ? `?${searchParamsStr}` : ''}`;
  const fullUrl = `${url.startsWith('http') ? '' : cloudQueryApiBaseUrl}${urlWithSearchParams}`;

  const response = await fetch(fullUrl, {
    method,
    ...(data ? { body: JSON.stringify(data) } : {}),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    signal,
  });

  const responseData: any = streamData ? {} : await response.json().catch(() => ({}));

  if (response.ok && response.status !== 205) {
    return {
      data: responseData as T,
      headers: response.headers,
      response,
      status: response.status,
      statusText: response.statusText,
    };
  }

  throw {
    data: streamData ? await response.json().catch(() => ({})) : responseData,
    headers: response.headers,
    isCustom: true,
    message: 'There was an error during the API request',
    payload: data,
    status: response.status,
  };
};

export default customFetch;
