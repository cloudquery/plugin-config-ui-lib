import Stack from '@mui/system/Stack';
import { SetupGuide } from './setupGuide';
import { RenderGuide } from './setupGuide/section';
import { GuideConfig, PluginConfig } from '../../types';
import React, { ReactElement } from 'react';

/**
 * Renderer for the config guide.
 *
 * @public
 */
export function GuideComponent({
  config,
  pluginUiMessageHandler,
}: {
  config: PluginConfig;
  pluginUiMessageHandler: any; // TODO: remove after iframe deprecation
}): ReactElement | null {
  if (!config.guide) {
    return null;
  } else if ((config.guide as GuideConfig)?.sections) {
    const guide = config.guide as GuideConfig;

    return (
      <SetupGuide
        title={guide.title}
        docsLink={config.docsLink}
        pluginUiMessageHandler={pluginUiMessageHandler}
      >
        <Stack spacing={3}>
          <RenderGuide pluginUiMessageHandler={pluginUiMessageHandler} sections={guide.sections} />
        </Stack>
      </SetupGuide>
    );
  } else if (config.guide) {
    const ConcreteComponent = config.guide as React.FC<{ config: PluginConfig }>;

    return (
      <SetupGuide
        title={`${config.label} configuration`}
        docsLink={config.docsLink}
        pluginUiMessageHandler={pluginUiMessageHandler}
      >
        <Stack spacing={3}>
          <ConcreteComponent config={config} />;
        </Stack>
      </SetupGuide>
    );
  }

  return null;
}
