# webpack迁移vite
## 更新依赖项
```js
// package.json
"@vue/cli-plugin-babel": "~4.5.0", // remove
"@vue/cli-plugin-eslint": "~4.5.0", // remove
"@vue/cli-plugin-router": "~4.5.0", // remove
"@vue/cli-plugin-vuex": "~4.5.0", // remove
"@vue/cli-service": "~4.5.0", // remove
```

我们还可以移除 `sass-loader`，因为 Vite 提供了对最常见的开箱即用预处理器的内置支持。这将允许我们继续使用我们选择的 CSS 预处理器。请注意，Vite 建议将原生 CSS 变量与PostCSS插件一起使用，这些插件实现 CSSWG 草稿并编写简单的、符合未来标准的 CSS。
```js
// package.json
"sass-loader": "^8.0.2" // remove
```

最后，我们将添加 Vite 作为依赖项，以及 Vite 的 Vue 插件组件以支持单文件组件。
```js
// package.json
"@vitejs/plugin-vue": "^1.6.1",
"vite": "^2.5.4",
```

此外，由于我们正在迁移 Vue 2 项目，因此除了官方 Vue 插件之外，我们还需要包含社区维护的 Vue 2 的 Vite 插件。如果我们使用 Vue 3，这将是不必要的。
```js
// package.json
"vite-plugin-vue2" : "1.9.0" // add for Vue 2
```

~~安装 Vite 插件后，我们现在还可以删除由 Vite Vue 插件处理的 vue 模板编译器。~~
```js
// package.json
// vue-template-compiler": "^2.6.11" // remove (SFC support provided by vite vue plugin)
```

## 只为现代浏览器提供支持
由于 Vite 是下一代构建工具，让我们乐观地继续，只支持最现代的浏览器。这将使我们的构建尽可能精简和快速。
实际上，这意味着我们可以从我们的依赖项中完全删除 `Babel`，因为大多数移动和桌面常青浏览器几乎完全支持所有 ES6 特性。如果你仍然需要支持像 Internet Explorer 11 这样的旧浏览器，Vite 确实为此提供了一个官方插件。
因此，要删除 `Babel`，首先我们将删除该`babel.config.js`文件。
接下来，由于我们已经删除了`@vue/cli-plugin-babel`需要 `babel` 本身的依赖项，我们只需要从 `package.json` 中删除几个其他与 `babel` 相关的依赖项。
```js
// package.json
"babel-eslint": "^10.1.0", // remove
"core-js": "^3.6.5", // remove
```
随着babel-eslint现在取出我们需要删除它作为我们的一个解析器.eslintrc文件。
```js
// .eslintrc
// remove
parserOptions: {
  parser: "babel-eslint",
},
```

注意：如果您的项目中没有 `linting/formatting` 设置，您可以跳到下一步，但如果您还没有，我强烈建议您添加它。这是一个很棒的教程，可用于在您的 `Vite` 驱动的 `Vue` 项目上进行设置。
最后，当我们进入时，`.eslintrc`我们需要将 `env` 从 `node` 更新为，es2021因为我们只支持那些常绿浏览器。
```js
// .eslintrc
env: {
    node: true, // remove
    es2021: true,
}
```

这个变化也将迫使我们, 必须更新`eslint`以及`eslint-plugin-vue,` 以支持 `es2021` 环境。
`npm install eslint@8 eslint-plugin-vue@8`

### 添加 Vite 配置
在这一步中，让我们为 Vue.js 项目配置 `Vite`。`Vite` 通过`vite.config.js`项目根目录中的文件进行配置。这是`vite.config.js`使用`npm init vite@latest`
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```
我们还想再添加 2 个东西。
首先，我们将导入 Vue 插件`vite-plugin-vue2`而不是官方的 Vite Vue 插件。
```js
// vite.config.js
import vue from '@vitejs/plugin-vue' // remove
import { createVuePlugin as vue } from "vite-plugin-vue2";
```

当然，如果您使用的是 Vue 3，则不必这样做。
其次，为了让@导入别名像在 Vue CLI 中一样工作，我们需要添加这一点。
```js
// vite.config.js
const path = require("path");
export default defineConfig({
  //...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## 移动 index.html
与`Vue CLI` 不同，`Vite` 实际上将保存 `Vue.js` 应用程序的 `index.html` 文件放在项目的根目录而不是公共目录中，因此您需要移动它。
同样在 index.html 中，您需要进行一些更改。
首先，我们将<%= htmlWebpackPlugin.options.title %>占位符的实例更改为硬编码值。
// index.html
<!--remove-->
<title><%= htmlWebpackPlugin.options.title %></title> 
<!--add-->
<title>Hard Coded Title</title>

<!--remove-->
<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
<!--add-->
<strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>

我们还需要用<%= BASE_URL %>绝对路径替换占位符。
```html
// index.html
<!--remove-->
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
<!--add-->
<link rel="icon" href="/favicon.ico">
```

最后也是最重要的是，JavaScript 应用程序不再自动注入，因此我们需要像这样包含它：
```html
<script type="module" src="/src/main.js"></script>
```
## 更新脚本
回到 `package.json`，我们还需要更新脚本。我们会将旧vue-cli-service命令更改为 Vite 特定命令。
```js
// package.json
"serve": "vue-cli-service serve", // remove
"build": "vue-cli-service build", // remove
"dev": "vite",
"build": "vite build",
"serve": "vite preview"
```

请注意，启动开发服务器的命令不再是serve. Vite 使用dev，serve用于在本地预览生产版本。
此外，如果您启用了 linting，您应该更新 lint 脚本以直接运行 eslint。
"lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src"
复制代码
第 6 步：更新环境变量
环境变量在 Vite 中的工作方式与它们在 Vue CLI 中的工作方式之间存在很多交叉。例如，您的 .env 命名约定可以保持不变。
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
复制代码
但是，您不能再访问变量上的环境process变量。相反，它们可以在 上找到import.meta.env。
// router/index.js
base: process.env.BASE_URL, //remove
base: import.meta.env.BASE_URL,
复制代码
此外，VUE_APP_用于使声明客户端公开的环境变量更明显的前缀更改为VITE_，因此如果您有任何此类环境变量，则必须相应地更新它们。
第 7 步：将 .vue 扩展名添加到 SFC 导入
虽然我们新创建的 Vue CLI 项目已经这样做了，但我敢打赌，您现有的应用程序可能没有。因此，您必须确保单个文件组件的所有导入都以.vue扩展名结尾。
// Home.vue
import HelloWorld from "@/components/HelloWorld.vue"; // .vue is required
复制代码
如果这个过程由于你的代码库的大小而过于繁重，你可以配置 vite 以便这不是必需的。这是通过添加.vue到 中的resolve.extensions配置选项来实现的vite.config.js。确保您还手动包含所有默认扩展名，尽管此选项会覆盖默认值。
// vite.config.js
//...
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    //...
  },
});
复制代码
虽然这有效，但应尽可能避免。为什么？因为根据 Vite 文档：“请注意，不建议省略自定义导入类型的扩展（例如.vue），因为它会干扰 IDE 和类型支持。”
第 8 步：清理魔法评论
最后，您可以删除所有用于命名动态导入的神奇注释，因为这些是特定于 webpack 的注释，对 Vite 没有任何意义。
// router/index.js
import(
    /* webpackChunkName: "about" */  // remove
    "../views/About.vue"
),
复制代码
相反，Vite 会根据原始 .vue 文件名和缓存破坏哈希自动命名您的块，如下所示： About.37a9fa9f.js
第 9 步：享受更快、更无缝的开发体验
完成上面的步骤 1-8 后，您的应用程序应该可以开始使用 Vite 运行了！继续启动你的开发服务器，npm run dev看看 Vite 对你自己有多快。
如果此时您有任何其他错误弹出，请在下面发表评论并与社区分享，以及您可能对他们有的任何解决方案！
最后，请记住，您可以在此示例存储库中将所有这些更改视为差异，以帮助您进行迁移。

作者：Invincible_
链接：https://juejin.cn/post/7036572682342629383
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
