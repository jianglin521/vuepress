# vite搭建vue3项目

## 创建vue3项目（vue官网）

```shell
#vue官网创建vue3项目
npm create vue@latest
```

这一指令将会安装并执行 `create-vue`，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示

```shell
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

## 创建vue3项目（vite官网）

### 项目初始化

```shell
# 创建vite4的vue3项目
npm create vite@4 my-vue-app -- --template vue
```

### 项目配置

#### eslint配置

```shell
npm i eslint -D
```

```shell
// 初始化配置EsLint
npx eslint --init
```

```js
//安装完成后，在项目根目录会出现.eslintrc.js文件
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
    }
}
```

项目下新建 `.eslintignore`, 并添加内容

```js
# eslint 忽略检查 (根据项目需要自行添加) 
/node_modules
/dist
/public
.vscode
.idea
```

在`package.json` 增加 `script`:

```json
{ 
    "scripts": { 
        "eslint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix" 
    } 
}
```
