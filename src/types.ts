import React from 'react';

import * as yup from 'yup';

import { RenderGuideProps } from './components/display';
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
export interface GuideConfig {
  title: string;
  sections: RenderGuideProps['sections'];
}

/**
 * @public
 */
export interface PluginConfig {
  name: string;
  type: 'source' | 'destination';
  label: string;
  docsLink: string;
  iconLink: string;
  steps: { children: (IterableStepComponent | React.FC<any>)[]; title: string }[];
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
