module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  env: {
    es6: true,
    browser: true
  },
  globals: {
    module: true,
    __dirname: true,
    require: true,
    process: true,
    WP: true,
    axios: true,
    Vue: true,
    Prism: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        trailingComma: 'all',
        singleQuote: true,
        semi: true
      }
    ],
    'no-var': 0,
    'no-unused-vars': ['error', { args: 'none' }],
    'no-underscore-dangle': 0,
    'no-inner-declarations': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-arrow-callback': 0,
    'no-console': 0,
    'no-continue': 0,
    'object-shorthand': 0,
    quotes: ['error', 'single'],
    'no-param-reassign': 0,
    'vars-on-top': 0,
    'func-names': 0,
    'consistent-return': 0,
    'global-require': 0,
    'vue/max-attributes-per-line': 0
  }
};
