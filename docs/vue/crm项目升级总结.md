## app升级总结
### vue-cli版本
`"@vue/cli-service": "4.5.15"`

### 常用命令
```shell
npm install -g @vue/cli # 安装vue-cli
npm update -g @vue/cli # 更新vue-cli
npm uninstall -g @vue/cli # 卸载vue-cli
vue -V # 查看vue-cli版本
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

## 问题
1. ~~启动报错`Invalid options in vue.config.js: "css.requireModuleExtension" is not allowed` ~~
   >~~`@vue/cli-service` 该 `css.requireModuleExtension` 选项被删除。如果您确实需要去除 `.moduleCSS`~~
   >~~[相关文档](https://next.cli.vuejs.org/migrations/migrate-from-v4.html#for-all-packages)~~
2. ~~启动报错` Parsing error: Cannot find module 'babel-eslint'`  ~~ 
   >~~`npm install babel-eslint --save-dev`~~
3. 启动报错 `Failed to resolve loader: script-loader`
   > 项目excel导出的依赖包 `npm install script-loader --save-dev`
4. 项目登录图标不显示图标
   > 项目excel导出的依赖包 `npm install svg-sprite-loader --save-dev`

### 升级之前
"@riophae/vue-treeselect": "^0.4.0",
"@vue/composition-api": "^1.1.3",
"axios": "^0.17.1",
"babel-polyfill": "^6.26.0", 暂未添加
"default-passive-events": "^2.0.0",
"element-ui": "2.7.2",
"file-saver": "^1.3.3",
"jquery": "^3.4.1",
"jquery-form": "^4.2.2",
"js-base64": "^2.4.3",
"js-md5": "^0.7.3",
"moment": "^2.21.0",
"v-viewer": "^1.5.1",
"vue": "^2.5.2",
"vue-calendar-component": "^2.8.2",
"vue-qr": "^2.2.1",
"vue-quill-editor": "^3.0.6",
"vue-router": "3.0.1",
"vuex": "^3.0.1",
"xlsx": "^0.12.4"

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


