/**
 * @public
 *
 * Returns the root element and shadow root container of the app.
 * This is useful for plugins that need to render in the app.
 *
 * @param rootSelector - The selector for the root element (default: '#root')
 * @param shadowRootWindowKey - The key to access shadow root from window object (default: 'REACT_ROOT')
 *
 */
export function getAppRootElements({
  rootSelector = '#root',
  shadowRootWindowKey = 'REACT_ROOT',
}: {
  rootSelector?: string;
  shadowRootWindowKey?: string;
} = {}) {
  let rootElement = document.querySelector(rootSelector) as HTMLElement;
  let shadowRootContainer: HTMLElement | undefined;

  if (shadowRootWindowKey && window[shadowRootWindowKey]) {
    rootElement = window[shadowRootWindowKey] as HTMLElement;

    const shadowRoot = rootElement.attachShadow({ mode: 'open' });

    shadowRootContainer = document.createElement('div');
    shadowRoot.append(shadowRootContainer);
  }

  return {
    rootElement: shadowRootContainer || rootElement,
    shadowRootContainer,
  };
}
