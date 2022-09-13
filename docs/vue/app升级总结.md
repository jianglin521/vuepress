## app升级总结
### vue-cli版本
`"@vue/cli-service": "~4.5.0"`

### 常用命令
```shell
npm install -g @vue/cli # 安装vue-cli
npm update -g @vue/cli # 更新vue-cli
vue -V # 查看vue-cli版本 @vue/cli-service@4.5.15
```

## node多版本工具nvm
[nvm安装地址](https://github.com/coreybutler/nvm-windows/releases)
```shell
nvm install 12.14.1 # 安装
nvm uninstall 12.14.1 # 卸载
nvm use 12.14.1 # 使用
```
### nvm安装node没有npm问题
[下载对应版本node](https://nodejs.org/download/release/) 复制到 `D:\nvm\v12.14.1`

### 创建项目
```shell
vue create hello-world # 创建项目
```
## 静态文件
静态文件目录处理
样式默认文件处理

## babel
.babelrc文件调整为babel.config.js
mint-ui中babel配置
vant中babel配置

## 配置文件调整
开发/生产环境文件调整

### 升级之前
@vue/cli 4.1.0
node v12.14.1
"axios": "^0.18.0",
"jquery": "^3.3.1",
"jquery-form": "^4.2.2",
"js-base64": "^2.4.3",
"js-md5": "^0.7.3",
"mint-ui": "^2.2.13",
"moment": "^2.22.2",
"vant": "^2.12.22",
"vue": "^3.0.15",
"vue-baidu-map": "^0.21.20",
"vue-router": "^3.0.1",
"vue-scroller": "^2.2.4",
"vuex": "^3.0.1"

### 升级之后
@vue/cli 4.5.15
"axios": "^0.26.0",
"core-js": "^3.6.5",
"jquery": "3.3.1",
"jquery-form": "4.2.2",
"js-base64": "^3.7.2",
"js-md5": "^0.7.3",
"mint-ui": "^2.2.13",
"moment": "^2.29.1",
"vant": "2.12.44",
"vue": "^2.6.11",
"vue-baidu-map": "^0.21.22",
"vue-router": "^3.2.0",
"vue-scroller": "^2.2.4",
"vuex": "^3.4.0"

## 现有项目修改eslint配置
```shell
// 修改现有项目的eslint配置
vue invoke eslint
```

## 添加prettier配置
```json
"@vue/eslint-config-prettier": "^6.0.0",
"eslint-config-prettier": "^6.15.0",
"eslint-plugin-prettier": "^3.3.1",
"prettier": "^2.2.1",
"stylelint-config-prettier": "^7.0.0",
```
```js
// .eslintrc.js
extends: [
  ...
  // '@vue/typescript/recommended',
  '@vue/prettier',
  'plugin:prettier/recommended',
  // '@vue/prettier/@typescript-eslint',
  'prettier'
]

// .stylelintrc.js
extends: [
  ...
  'stylelint-config-prettier'
]

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

## stylus转scss
```shell
# https://juejin.cn/post/7097491392854753287

npm install -g stylus-converter

stylus-conver -d yes -i src -o src-temp

npm view stylus-converter versions

```

## stylelint配置
```json
// scripts
"lint:css": "stylelint **/*.{vue,css,scss} --fix",
// devDependencies
"postcss": "^8.4.14",
"postcss-html": "^1.5.0",
"stylelint": "^14.9.1",
"stylelint-config-html": "^1.1.0",
"stylelint-config-recommended-scss": "^7.0.0",
"stylelint-config-recommended-vue": "^1.4.0",
"stylelint-config-standard": "^26.0.0",
"stylelint-config-standard-scss": "^5.0.0",
"stylelint-order": "^5.0.0",
"stylelint-webpack-plugin": "^2.4.0",
```

```js
// vue.config.js
const StylelintPlugin = require('stylelint-webpack-plugin')

plugins: [
  new StylelintPlugin({
    files: '**/*.{vue,css,scss}',
    fix: true,
    failOnError: false
  })
]
```
