import { AuthType } from '../types';

/**
 * Prepare the OAuth ConnectorId
 * ONLY valid if the form is using the "OAUTH" auth type
 */
export function prepareOAuthValue(values: Record<string, any>): {
  connectorId?: string;
} {
  const base: {
    connectorId?: string;
  } = {};

  if (values._authType === AuthType.OAUTH) {
    base.connectorId = values.connectorId;
  }

  return base;
}
