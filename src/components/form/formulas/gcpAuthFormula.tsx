import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';

import { AuthType } from '../../../types';
import { GCPConnect } from '../../auth/gcp/GCPConnect';
import { UploadJSON } from '../../inputs/uploadJSON';

/**
 * @public
 * Returns the `children` array for a PluginConfig section to render
 * the Authentication options for any GCP-based plugin.
 */
export const getGCPAuthFormula = (
  initialValues?: FormMessagePayload['init']['initialValues'] | undefined,
) => [
  {
    component: 'control-exclusive-toggle',
    name: '_authType',
    options: [
      {
        label: 'Use CloudQuery Service Account',
        value: AuthType.OAUTH,
      },
      {
        label: 'Use a service account JSON file',
        value: AuthType.OTHER,
      },
    ],
    schema: yup
      .mixed()
      .oneOf(Object.values(AuthType))
      .default(initialValues?.spec?.service_account_key_json ? AuthType.OTHER : AuthType.OAUTH),
  },
  {
    component: 'sub-section',
    shouldRender: (values: any) => values._authType === AuthType.OAUTH,
    children: [GCPConnect],
  },
  {
    component: 'sub-section',
    shouldRender: (values: any) => values._authType === AuthType.OTHER,
    children: [
      {
        name: 'service_account_key_json',
        component: UploadJSON,
        schema: yup
          .string()
          .default(initialValues?.spec?.service_account_key_json ?? '')
          .when('_authType', {
            is: (_authType: AuthType) => _authType === AuthType.OTHER,
            // eslint-disable-next-line unicorn/no-thenable
            then: (schema: any) => schema.required(),
          }),
      },
    ],
  },
];
