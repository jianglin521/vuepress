# vue3项目搭建

### 1 项目初始化

[原文地址](https://juejin.cn/post/6964262845840097294)

```shell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

那么接下来我们就参照vue2.x的全家桶来从零填充一下项目基础模块:

```
1. vite.config.js(等同于vue.config.js)配置一些服务配置以及打包配置
2. vuex4.0状态管理，管理全局状态
3. vue-router引入
4. axios处理xhr请求的配置，缺省配置，以及请求拦截
5. 引入UI框架并设置一些常用主题配置
```

### 2 vite.config.js配置

```js
const path = require('path')
// vite.config.js # or vite.config.ts

module.exports = {
  // 引入第三方的配置 会将引入的第三方文件移动到E: \gitcode\gitcode\工程目录\gitcode\工程目录\node_modules\gitcode\工程目录\node_modules\.vite_opt_cache目录中
  optimizeDeps: {
    include: []
  },
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
  },
  //   hostname: '0.0.0.0',
  port: 8080,
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  // 反向代理
  proxy: {
    '/api': {
      target: 'https://blog.csdn.net/weixin_45292658',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}

```

### 3. vuex4.x的引入

- 安装

```
npm install vuex@next --save
```