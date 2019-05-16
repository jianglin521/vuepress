## vue安装
### 查看vue-cli版本
`vue --version 或者 vue -V`

### 全局安装创建 vue-cli 2.0
`npm install --global vue-cli` // 2.0安装

`vue init webpack my-project` // 2.0创建

### 全局安装创建 vue-cli 3.0
::: warning 注意
Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
:::

`npm install -g @vue/cli` // 3.0安装

`vue create my-project` // 3.0创建

### 现有项目中安装插件 vue-cli 3.0
当你使用 vue create 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 vue add 命令：
```sh
vue add @vue/eslint
```
::: tip 提示
vue add 的设计意图是为了安装和调用 Vue CLI 插件。这不意味着替换掉普通的 npm 包。对于这些普通的 npm 包，你仍然需要选用包管理器。
:::

## stylus安装
`npm install stylus stylus-loader --save-dev`

**stylus编写样式**
```html
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
```
## 自定义指令
```js
	// 注册一个全局自定义指令 `v-focus`
	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		inserted: function (el) {
			// 聚焦元素
			el.focus()
		}
	})
```
如果想注册局部指令，组件中也接受一个 directives 的选项：
```js
	// 注册一个全局自定义指令 `v-focus`
	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		inserted: function (el) {
			// 聚焦元素
			el.focus()
		}
	})
```
然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：
```html
	<input v-focus>
```
## 开发插件与使用
### 开发
Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```js
	MyPlugin.install = function (Vue, options) {
		// 1. 添加全局方法或属性
		Vue.myGlobalMethod = function () {
			// 逻辑...
		}

		// 2. 添加全局资源
		Vue.directive('my-directive', {
			bind (el, binding, vnode, oldVnode) {
				// 逻辑...
			}
			...
		})

		// 3. 注入组件选项
		Vue.mixin({
			created: function () {
				// 逻辑...
			}
			...
		})

		// 4. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			// 逻辑...
		}
	}
```
### 使用
```js
	// 调用 `MyPlugin.install(Vue)`
	Vue.use(MyPlugin)
```

## mockjs安装
`npm install mockjs --save-dev`

**官方网站** [http://mockjs.com/](http://mockjs.com/)

### 简单使用
mockServer.js内容
```js
	//引入mockjs
	import Mock from 'mockjs'
	//创建数据
	let data = Mock.mock({
	  'goods|100': [{
	    'id|+1': 1,
	    //出生年月
	    'date': '@date("yyyy-MM-dd")',
	    // 邮箱
	    'email': '@email',
	    // 汉字姓名
	    'name': '@cname()',
	    // 地址
	    'address': '@province' + '@city' + '@county',
	    // 手机号
	    'phone': /^1[385][1-9]\d{8}/
	  }]
	})
	//console.log(JSON.stringify(data, null, 4))
	
	// 映射几个接口
	Mock.mock('/api/goods', {
	  code: 0,
	  data: data.goods
	})
	
	//只需要让当前文件被执行一次即可
```
### 模拟数据
```js
	Mock.mock(template)
	Mock.mock(rurl,function(options))
	Mock.mock(rurl,rtype,template)
	Mock.mock(rurl,rtype,function(options))
```
- template表示数据模板，可以是{'data|1-10':[{}]}也可以是’@EMAIL’
- rurl表示要拦截的地址，可以使普通的url如http://c.cn，也可以是url正则表达式/\.json/
- rtype表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
- funtion(options)表示用于生成响应数据的函数。
在main.js中添加
`import './mock/mockServer'`

## 编码测试与发布
### 编码测试
```
  npm run dev
```
访问: http://localhost:8080
编码, 自动编译打包(HMR), 查看效果

### 打包发布
```
  npm run build
  npm install -g pushstate-server
  pushstate-server dist
```
访问: http://localhost:9000

## dev环境跨域
```js
 proxyTable: {
      //跨域请求
      '/crmapi': {
        target: 'http://192.168.199.202:8080/',//服务器
        changeOrigin: true,
        pathRewrite: {
          '^/crmapi': ''
        }
      }
```

## 去除.map
`productionSourceMap: false` //去除.map文件

## 去除打包后打印输出
在webpack.prod.config.js中修改为如下：
```js
  uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,//去除注释
          drop_console: true,//去除注释
        }
      }
```

## 打包路径错误
**解决**：到config文件夹中打开index.js文件。

文件里面有两个assetsPublicPath属性，更改build里面的assetsPublicPath属性变为：`assetsPublicPath: './'`

**效果截图**
![](https://i.loli.net/2019/04/02/5ca324988ce79.png)

