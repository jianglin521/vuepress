# eslint使用
## vue-cli2.0添加eslint
```json
  "babel-eslint": "^8.2.1",
  "eslint": "^4.15.0",
  "eslint-config-standard": "^10.2.1",
  "eslint-friendly-formatter": "^3.0.0",
  "eslint-loader": "^1.7.1",
  "eslint-plugin-import": "^2.7.0",
  "eslint-plugin-node": "^5.2.0",
  "eslint-plugin-promise": "^3.4.0",
  "eslint-plugin-standard": "^3.0.1",
  "eslint-plugin-vue": "^4.0.0",
```
## eslint配置
```js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 自定义
    'space-before-function-paren': ["error", "never"],
    'vue/no-unused-vars': 0,
    'vue/require-v-for-key': 0,
    'eqeqeq': 0,
    'camelcase': 0,
    'no-return-assign': 0,
    'handle-callback-err': 0,
    'spaced-comment': 0,
  }
}
```