module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-for-of', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-syntax-dynamic-import']
  ]
};
