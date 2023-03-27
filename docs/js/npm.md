## npm简介

npm 是世界上最大的开放源代码的生态系统。我们可以通过 npm 下载各种各样的包。
在我们安装 Node 的时候，它默认会顺带给你安装 npm。

```shell
  npm -v：查看 npm 版本。
  npm list：查看当前目录下都安装了哪些 npm 包。
  npm info 模块：查看该模块的版本及内容。
  npm i 模块@版本号：安装该模块的指定版本。
  npm root -g 查看全局安装包位置
  npm list -g --depth=0 查看全局安装的npm包
```

在平时使用 npm 安装包的过程中，你可能需要知道一些 npm 基本知识：

```shell
  i/install：安装。使用 install 或者它的简写 i，都表明你想要下载这个包。
  uninstall：卸载。如果你发现这个模块你已经不使用了，那么可以通过 uninstall 卸载它。
  g：全局安装。表明这个包将安装到你的计算机中，你可以在计算机任何一个位置使用它。
  --save/-S：安装在 package.json 中的 dependencies 中。dependencies 是需要发布在生成环境的。
  --save-dev/-D：安装在 package.json 中的 devDependencies 中。devDependencies 只在开发环境使用。
```
  
那么，这么多的 npm 包，我们通过什么管理呢？

答案是 package.json

如果我们需要创建 package.json，那么我们只需要在指定的包管理目录（例如 node_modules）中通过以下命名进行生成：

```shell
  npm init：按步骤创建 package.json
  npm init --yes：快速创建 package.json
```

## 强制约束包管理器

1. 此版本受npm版本限制

```json
"scripts": {
    "preinstall": "npx only-allow npm" // 意思就是只允许使用npm管理
}
```

2. vue3官网版本

```json
"scripts": {
    "preinstall": "node ./scripts/preinstall.js"
}
```

```js
// preinstall.js 
if (!/npm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`
  )
  process.exit(1)
}
```

## npm安装依赖问题

- `npm install --legacy-peer-deps`: 按照npm版本4到版本6的风格，安装时忽略所有对等依赖关系。

- `npm install --strict-peer-deps`: 遇到任何冲突的对等依赖关系时，失败并中止安装过程。默认情况下，npm只会因为根项目的直接依赖关系导致的对等依赖关系冲突而崩溃。

- `npm install --force`: 将强制npm获取远程资源，即使磁盘上存在本地副本。
- NPM 本身不会在给定模块的页面上列出对等依赖。但是，有一个简单的解决方法可以在安装之前或之后检查对等依赖。只需运行`npm info name-of-module peerDependencies`

## 项目配置legacy-peer-deps

```txt
# .npmrc
# npm 从命令行、环境变量和npmrc文件中获取其配置设置。
# 该npm config命令可用于更新和编辑用户和全局 npmrc 文件的内
legacy-peer-deps=true
```

## 查看npm本地连接地址

`npm config get registry`

## 查看包所有版本

### 查看npmjs服务器上包的版本信息

`npm view jquery versions` 查看npm服务器上所有的jquery版本信息

`npm view jquery version` 只能查看jquery的最新的版本是哪一个

`npm info jquery` 这种方式和第一种类似，也可以查看jquery所有的版本，但是能查出更多的关于jquery的信息

### 查看本地已经安装的包的版本信息

`npm list -g --depth=0` 查看全局安装的npm包

`npm ls jquery` (查看某个项目安装的jQuery)，命令必须在某个项目下执行

`npm ls jquery -g` (查看全局安装的jquery)
