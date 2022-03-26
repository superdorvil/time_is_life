module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _components: './src/components',
          _constants: './src/components/constants',
          _data: './src/components/data',
          _schemas: './src/components/data/schemas',
          _resources: './src/resources',
          _scenes: './src/scenes',
          _utils: './src/utils',
        },
      },
    },
  },
};
