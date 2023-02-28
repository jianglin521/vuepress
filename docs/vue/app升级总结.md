## app升级总结

### vue-cli版本

`"@vue/cli-service": "~4.5.0"`

### 常用命令

```shell
npm install -g @vue/cli # 安装vue-cli
npm update -g @vue/cli # 更新vue-cli
vue -V # 查看vue-cli版本 @vue/cli-service@4.5.15
vue create hello-world # 创建项目
```

## node多版本工具nvm

[nvm安装地址](https://github.com/coreybutler/nvm-windows/releases)

```shell
nvm install 12.14.1 # 安装
nvm uninstall 12.14.1 # 卸载
nvm use 12.14.1 # 使用
```

settings.txt添加以下文件

```txt
node_mirror: https://registry.npmmirror.com/
npm_mirror: https://registry.npmmirror.com/
node多版本工具nvm
```

## 设置npm源

设置npm的源，可以设置多个源，但是只有一个是生效的

```shell
#设置淘宝源
npm config set registry https://registry.npm.taobao.org
#设置公司的源
npm config set registry http://127.0.0.1:4873
#查看源，可以看到设置过的所有的源
npm config get registry
```

## stylus转scss

```shell
# https://juejin.cn/post/7097491392854753287

npm install -g stylus-converter

stylus-conver -d yes -i src -o src-temp

npm view stylus-converter versions

```

## vue3配置

### package.json

```json
{
  "name": "hello-world",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "deploy:test": "deploy-cli-service deploy --mode test",
    "dev": "vue-cli-service serve",
    "log": "conventional-changelog --config ./node_modules/vue-cli-plugin-commitlint/lib/log -i CHANGELOG.md -s -r 0",
    "prepare": "husky install"
  },
  "dependencies": {
    "axios": "^0.26.0",
    "core-js": "^3.6.5",
    "js-base64": "^3.7.2",
    "js-md5": "^0.7.3",
    "pinia": "^2.0.28",
    "vue": "^3.2.47",
    "vue-router": "^4.0.0-0"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^4.18.0",
    "@typescript-eslint/parser": "^4.18.0",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.15",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-typescript": "~4.5.15",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/eslint-config-typescript": "^7.0.0",
    "babel-eslint": "^10.1.0",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-import": "^1.13.3",
    "commitizen": "^4.0.3",
    "commitlint": "^8.2.0",
    "conventional-changelog-cli": "^2.2.2",
    "eslint": "^6.7.2",
    "husky": "^8.0.1",
    "lint-staged": "^9.5.0",
    "prettier": "^2.2.1",
    "right-pad": "^1.0.1",
    "sass": "^1.54.0",
    "sass-loader": "^9.0.0",
    "stylelint": "^14.9.1",
    "stylelint-config-prettier": "^7.0.0",
    "stylelint-config-standard-scss": "^6.1.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-order": "^5.0.0",
    "stylelint-webpack-plugin": "^2.4.0",
    "typescript": "4.4.4",
    "vconsole-webpack-plugin": "^1.7.3",
    "vue-cli-plugin-commitlint": "~1.0.12"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/vue-cli-plugin-commitlint/lib/cz"
    }
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{scss,vue}": [
      "npx stylelint --fix"
    ],
    "*.{js,jsx,vue,ts,tsx}": [
      "vue-cli-service lint"
    ]
  }
}

```

### eslint

```js
// .eslintrc.js 配置
module.exports = {
  root: true,

  env: {
    node: true
  },

  // 解决eslint中BMap报错
  // globals: {
  //   BMap: true,
  //   wx: true
  // },

  extends: [
    '@vue/standard',
    'plugin:vue/vue3-essential',
    '@vue/typescript',
    'eslint:recommended',
    // '@vue/typescript/recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
    // '@vue/prettier/@typescript-eslint',
    'prettier'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'generator-star-spacing': 'off',
    'vue/no-unused-vars': 0,
    'vue/require-v-for-key': 0,
    quotes: [
      'error',
      'single'
    ],
    'vue/multi-word-component-names': 0,
    'vue/no-mutating-props': 0,
    'no-unused-vars': 0,
    'eslint-disable-next-line': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  'extends': [
    '@vue/standard',
    'plugin:vue/vue3-essential',
    '@vue/typescript',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
    'prettier',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint'
  ]
}

```

```shell
#.eslintignore
/public/static/*

```

### prettier

```js
// .prettierrc.js
module.exports = {
  printWidth: 120, // 单行长度
  tabWidth: 2, // 缩进长度
  bracketSpacing: true, // 箭头函数括号
  semi: false, // 句末使用分号
  singleQuote: true, // 使用单引号
  endOfLine: 'auto', // 结束行形式
  trailingComma: 'none', // 尾随逗号
  htmlWhitespaceSensitivity: 'strict'
}
```

```shell
# .prettierignore
# Ignore artifacts:
dist
```

### 包依赖问题

```shell
# .npmrc
legacy-peer-deps=true
```
