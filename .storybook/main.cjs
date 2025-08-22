const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths');

module.exports = {
   stories: [
    '../src/components/**/**/*.stories.@(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
