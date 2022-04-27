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
随着`babel-eslint`现在取出我们需要删除它作为我们的一个解析器.eslintrc文件。
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
```html
<!--remove-->
<title><%= htmlWebpackPlugin.options.title %></title> 
<!--add-->
<title>Hard Coded Title</title>

<!--remove-->
<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
<!--add-->
<strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
```

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
