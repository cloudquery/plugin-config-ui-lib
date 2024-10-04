import React from 'react';

import * as yup from 'yup';

import { IterableStepComponent } from './components/form/renderer/types';
import '@cloudquery/cloud-ui';

/**
 * @public
 */
export enum AuthType {
  OAUTH,
  OTHER,
}

/**
 * @public
 */
export type GuideSectionBody = {
  code?: string;
  image?: string;
  text?: any;
  shouldRender?: (values: any) => boolean;
};

/**
 * @public
 */
export type GuideSection = {
  header?: string;
  bodies: GuideSectionBody[];
  shouldRender?: (values: any) => boolean;
};

/**
 * @public
 */
export interface GuideConfig {
  title: string;
  sections: GuideSection[];
}

/**
 * @public
 */
export type PluginConfigFormStep = {
  children: (IterableStepComponent | React.FC<any>)[];
  title: string;
  submitGuard?: (formValues: any) => Promise<boolean>;
};

/**
 * @public
 */
export interface PluginConfig {
  name: string;
  type: 'source' | 'destination';
  label: string;
  docsLink: string;
  iconLink: string;
  steps: PluginConfigFormStep[];
  stateSchema?: Record<string, yup.AnySchema>;
  auth: AuthType[];
  guide: React.FC | GuideConfig;
  errorCodes?: Record<string, string>;
  debug?: boolean;
}

/**
 * @public
 */
export interface SourceConfig extends PluginConfig {
  type: 'source';
}

/**
 * @public
 */
export interface DestinationConfig extends PluginConfig {
  type: 'destination';
}
