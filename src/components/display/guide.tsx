import React, { ReactElement } from 'react';

import Stack from '@mui/material/Stack';

import { useFormContext } from 'react-hook-form';

import { SetupGuide } from './setupGuide';
import { RenderGuide } from './setupGuide/section';
import { usePluginContext } from '../../context/plugin';
import { GuideConfig } from '../../types';

/**
 * Renderer for the config guide.
 *
 * @public
 */
export function GuideComponent({
  pluginUiMessageHandler,
}: {
  pluginUiMessageHandler: any; // TODO: remove after iframe deprecation
}): ReactElement | null {
  const { watch } = useFormContext();
  const values = watch();
  const { config } = usePluginContext();

  if (!config.guide) {
    return null;
  } else if ((config.guide as GuideConfig)?.sections) {
    const guide = config.guide as GuideConfig;

    return (
      <SetupGuide
        title={typeof guide.title === 'function' ? guide.title(values) : guide.title}
        docsLink={config.docsLink}
        pluginUiMessageHandler={pluginUiMessageHandler}
      >
        <Stack spacing={3}>
          <RenderGuide pluginUiMessageHandler={pluginUiMessageHandler} sections={guide.sections} />
        </Stack>
      </SetupGuide>
    );
  } else if (config.guide) {
    const ConcreteComponent = config.guide as React.FC;

    return (
      <SetupGuide
        title={`${config.label} configuration`}
        docsLink={config.docsLink}
        pluginUiMessageHandler={pluginUiMessageHandler}
      >
        <Stack spacing={3}>
          <ConcreteComponent />
        </Stack>
      </SetupGuide>
    );
  }

  return null;
}
