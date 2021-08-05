# 自定义指令和插件开发
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