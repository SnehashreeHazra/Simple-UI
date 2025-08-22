const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.plugins?.push(tsconfigPaths());
    return config;
  },
};
