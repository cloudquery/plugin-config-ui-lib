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

    // eslint-disable-next-line unicorn/prefer-spread
    const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));

    for (const styleElement of styleElements) {
      shadowRoot.prepend(styleElement);
    }

    // Observe head for new style elements and copy them to shadow root
    // const headObserver = new MutationObserver((mutations) => {
    //   for (const mutation of mutations) {
    //     // eslint-disable-next-line unicorn/prefer-spread
    //     for (const node of Array.from(mutation.addedNodes)) {
    //       if (
    //         node instanceof HTMLElement &&
    //         (node.tagName === 'STYLE' ||
    //           (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet'))
    //       ) {
    //         shadowRoot.prepend(node);
    //       }
    //     }
    //   }
    // });

    // headObserver.observe(document.head, {
    //   childList: true,
    // });
  }

  return {
    rootElement: shadowRootContainer || rootElement,
    shadowRootContainer,
  };
}
