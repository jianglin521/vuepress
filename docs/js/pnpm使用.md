# pnpm使用

## 安装pnpm

```shell
npm install -g pnpm #通过npm全局安装
pnpm config set registry http://registry.npm.taobao.org # 设置淘宝镜像
pnpm add xxx --save // 写入dependencies
pnpm add xxx --save-dev // 写入devDependencies
pnpm add xxx -g // 全局安装
```

### pnpm

我选用的是 `pnpm`，创建非扁平化的 `node_modules`，对比`npm`能够避免一些错误：

1. 依赖结构的不确定性。
2. 扁平化算法本身的复杂性很高，耗时较长。
3. 项目中仍然可以非法访问没有声明过依赖的包。

### 安装项目依赖

```json
"axios": "^0.21.1",
"element-plus": "^1.0.2-beta.70",
"vue": "^3.0.5",
"vue-router": "^4.0.11",
"vuex": "^4.0.2"
```

```shell
pnpm add axios element-plus vue vue-router vuex --save
```

#### 处理报错

```shell
pnpm add @types/lodash-es

pnpm add vite-plugin-babel-import --save-dev

pnpm add vite-plugin-style-import --save-dev
```
