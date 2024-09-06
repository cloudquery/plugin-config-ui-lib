import React from 'react';
import * as yup from 'yup';

import { RenderGuideProps } from './components/display';
import { RenderSection } from './components/display/renderer/types';

/**
 * @public
 */
export enum AuthType {
  OAUTH,
  OTHER,
}

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
  steps: { sections: (RenderSection | React.FC<any>)[]; title: string }[];
  stateSchema?: yup.AnySchema;
  auth: AuthType[];
  guide: React.FC | GuideConfig;
  errorCodes?: Record<string, string>;
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
