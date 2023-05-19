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
  "name": "app-test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "deploy": "deploy-cli-service deploy --mode test",
    "build:debug": "vue-cli-service build --debug",
    "cz": "npm run log && git add . && git cz",
    "dev": "vue-cli-service serve",
    "lint:css": "stylelint **/*.{vue,css,scss} --fix",
    "log": "conventional-changelog --config ./node_modules/vue-cli-plugin-commitlint/lib/log -i CHANGELOG.md -s -r 0",
    "prepare": "husky install"
  },
  "dependencies": {
    "@vant/touch-emulator": "^1.3.2",
    "axios": "^0.26.0",
    "core-js": "^3.8.3",
    "jquery": "3.3.1",
    "jquery-form": "4.2.2",
    "js-base64": "^3.7.2",
    "js-md5": "^0.7.3",
    "moment": "^2.29.1",
    "pinia": "^2.0.14",
    "qrcode.vue": "^3.3.3",
    "vant": "^3.4.9",
    "vue": "^3.0.0",
    "vue-class-component": "^8.0.0-0",
    "vue-router": "^4.0.15"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^4.18.0",
    "@typescript-eslint/parser": "^4.18.0",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-typescript": "~4.5.15",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/eslint-config-standard": "^5.1.2",
    "@vue/eslint-config-typescript": "^7.0.0",
    "babel-eslint": "^10.1.0",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-import": "^1.13.3",
    "commitizen": "^4.0.3",
    "commitlint": "^8.2.0",
    "conventional-changelog-cli": "^2.2.2",
    "eslint": "^6.7.2",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^7.0.0",
    "husky": "^8.0.1",
    "lint-staged": "^10.5.4",
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
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
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
    "*.{js,ts,vue}": [
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

### stylelint

```js
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-id-pattern': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    // "declaration-block-trailing-semicolon": null,
    // 每个样式规则前后都有空行，除了第一条规则与规则前有注释
    'rule-empty-line-before': [
      'always',
      {
        except: [ 'after-single-line-comment', 'first-nested' ]
      }
    ],
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}

```

```shell
# stylelintignore

# 其他类型文件
*.js
*.jpg
*.woff

# 测试和打包目录
/dist/
/public/

```

### 包依赖问题

```shell
# .npmrc
legacy-peer-deps=true
```
