import { cloudQueryOauthConnectorUrl } from './constants';

export function getOauthSuccessBaseUrl(): string {
  return window.self === window.top
    ? 'http://localhost:3001'
    : process.env.NODE_ENV === 'production'
      ? cloudQueryOauthConnectorUrl
      : 'http://localhost:3000/auth/connector';
}
