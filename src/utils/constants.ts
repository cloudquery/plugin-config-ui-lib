/**
 * CloudQuery API base URL
 *
 * @public
 */
export const cloudQueryApiBaseUrl =
  (typeof window !== 'undefined' &&
    ((window as any).REACT_APP_CLOUDQUERY_API_BASE_URL as string | undefined)) ||
  process.env.REACT_APP_CLOUDQUERY_API_BASE_URL ||
  'https://api.cloudquery.io';

/**
 * CloudQuery OAuth Connector URL
 *
 * @public
 */
export const cloudQueryOauthConnectorUrl =
  (typeof window !== 'undefined' &&
    ((window as any).REACT_APP_CLOUDQUERY_OAUTH_CONNECTOR_URL as string | undefined)) ||
  process.env.REACT_APP_CLOUDQUERY_OAUTH_CONNECTOR_URL ||
  'https://cloud.cloudquery.io/auth/connector';

/**
 * Universal placeholder for the SecretInput value
 *
 * @public
 * @deprecated - this should no longer be used and will be removed in a future version.
 * see secretValueHandling util instead.
 */
export const secretFieldValue = 'b25b8efe-63fd-4c32-9f87-059cfd649128';

export const envPlaceholder = '************';
