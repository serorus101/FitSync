module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};