export function getAppRootElements({
  rootSelector = '#root',
  shadowRootWindowKey = 'REACT_ROOT',
}: {
  rootSelector?: string;
  shadowRootWindowKey?: string;
}) {
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
