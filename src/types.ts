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

export interface PluginConfig {
  name: string;
  type: 'source' | 'destination';
  label: string;
  docsLink: string;
  steps: { sections: RenderSection[]; title: string }[];
  auth: AuthType[];
  guide: React.FC | GuideConfig;
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
