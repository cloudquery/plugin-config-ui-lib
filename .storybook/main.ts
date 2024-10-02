import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      define: {
        'process.env': {
          REACT_APP_CLOUDQUERY_API_BASE_URL: '',
          REACT_APP_CLOUDQUERY_OAUTH_CONNECTOR_URL: '',
          REACT_APP_PLUGIN_TEAM: 'cloudquery',
          REACT_APP_PLUGIN_KIND: 'source',
          REACT_APP_PLUGIN_NAME: 'datadog',
          REACT_APP_PLUGIN_VERSION: 'development',
        },
      },
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};
export default config;
