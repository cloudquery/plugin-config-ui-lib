import { useEffect, useState } from 'react';

import { FormMessagePayload, PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import { RudderAnalytics } from '@rudderstack/analytics-js';

/**
 * This hook is used to initialize the plugin UI form.
 * It subscribes to the `init` message to get initial values
 * and sends a `ready` message to the CloudQuery Cloud App
 * with information whether to hide the submit button from the beginning.
 *
 * @public
 */
export function useFormInit(
  pluginUiMessageHandler: PluginUiMessageHandler,
  implementsCustomFooter: boolean,
): {
  initialized: boolean;
  initialValues: FormMessagePayload['init']['initialValues'] | undefined;
  teamName: string;
  context: FormMessagePayload['init']['context'] | undefined;
  isManagedDestination: boolean;
  user: { id: string; name: string; email: string };
} {
  const [context, setContext] = useState<FormMessagePayload['init']['context'] | undefined>();
  const [initialized, setInitialized] = useState(false);
  const [initialValues, setInitialValues] = useState<
    FormMessagePayload['init']['initialValues'] | undefined
  >();
  const [teamName, setTeamName] = useState<string>('');
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [isManagedDestination, setIsManagedDestination] = useState(false);

  useEffect(() => {
    pluginUiMessageHandler.sendMessage('loaded');

    return pluginUiMessageHandler.subscribeToMessageOnce(
      'init',
      ({ initialValues, teamName, rudderstackConfig, context, isManagedDestination, user }) => {
        if (rudderstackConfig) {
          const rudderAnalytics = new RudderAnalytics();
          rudderAnalytics.load(rudderstackConfig.key, rudderstackConfig.dataPlaneUrl);

          rudderAnalytics.identify(user.id, {
            email: user.email,
            name: user.name,
          });

          rudderAnalytics.group(teamName, {
            name: 'team',
          });

          trackAllClicks(rudderAnalytics);
        }

        setUser(user);

        if (initialValues) {
          setInitialValues(initialValues);
        }

        setTeamName(teamName);
        setContext(context);
        setIsManagedDestination(!!isManagedDestination);

        setInitialized(true);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialized) {
      pluginUiMessageHandler.sendMessage('ready', {
        implementsCustomFooter,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  return { initialized, initialValues, teamName, context, isManagedDestination, user };
}

function trackAllClicks(rudderAnalytics: RudderAnalytics) {
  document.addEventListener(
    'click',
    (event: MouseEvent) => {
      const buttonOrLink: HTMLButtonElement | HTMLAnchorElement | null = (
        event.target as HTMLElement
      ).closest('button, a');

      if (buttonOrLink) {
        const payload: { disabled?: boolean; text: string } = {
          text: buttonOrLink.title || buttonOrLink.textContent || 'Unknown',
        };

        if (buttonOrLink instanceof HTMLButtonElement && buttonOrLink.disabled) {
          payload.disabled = true;
        }

        const eventName = buttonOrLink instanceof HTMLButtonElement ? 'buttonClick' : 'linkClick';
        rudderAnalytics.track(eventName, payload);
      }
    },
    true,
  );
}
