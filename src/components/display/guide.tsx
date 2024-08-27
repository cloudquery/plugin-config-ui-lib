import Stack from '@mui/system/Stack';
import { SetupGuide } from './setupGuide';
import { RenderGuide } from './setupGuide/section';
import { GuideConfig, PluginConfig } from '../../types';
import React from 'react';

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
}) {
  if (React.isValidElement(config.guide)) {
    const ConcreteComponent = config.guide as any; // TODO

    return <ConcreteComponent />;
  } else {
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
  }
}
