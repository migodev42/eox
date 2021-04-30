/* eslint-env node */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',

        // 影响tree-shaing的相关配置
        // 'loose': false,
        // 'modules': false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        // useESModules: false,
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
};
