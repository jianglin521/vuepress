## vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式

**官网地址**
[https://vuex.vuejs.org/zh-cn/api.html](https://vuex.vuejs.org/zh-cn/api.html)

## vuex原理
![](https://i.imgur.com/Z81hKSZ.png)

- dispatch可以是view视图中触发，也可以是程序业务逻辑来触发
- actions通过commit方法发出一个改变事件
- mutations中具体操作state的改变
- state的改变通过getter暴露给view，state改变后会立即通知用getter关联起来的view。
- 创建一个Vuex.Store的实例，用于Vue实例。

## 安装
`npm install vuex --save`

## API
### start
**state**：在vue中引入store对象，在子组件中通过`this.$store`来访问vuex中状态，并且我们最好在vue的computed中获取vuex的状态。
**mapState**：这是一个语法糖，可以快捷的获取更多的state。
接受一个object参数：
```js
	// 在单独构建的版本中辅助函数为 Vuex.mapState
	import { mapState } from 'vuex'
	
	export default {
	  // ...
	  computed: mapState({
	    // 箭头函数可使代码更简练
	    count: state => state.count,
	
	    // 传字符串参数 'count' 等同于 `state => state.count`
	    countAlias: 'count',
	
	    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
	    countPlusLocalState (state) {
	      return state.count + this.localCount
	    }
	  })
	}
```
当计算属性的名称和节点名称相同时，也可以接受一个数组对象。
```js
	computed: mapState([
	  // 映射 this.count 为 store.state.count
	  'count'
	])
```
对象展开：合成最终的computed属性
```js
	computed: {
	  localComputed () { /* ... */ },
	  // 使用对象展开运算符将此对象混入到外部对象中
	  ...mapState({
	    // ...
	  })
	}
```
----------

### getter
**getter**：store的计算属性，在获取数据的时候，我们可以通过getter进行数据的操作，在相同地方用到的数据操作就不需要写一个公用的处理函数。它接受2个参数，state和getters。
```js
	getters: {
	  // ...
	  doneTodosCount: (state, getters) => {
	    return getters.doneTodos.length
	  }
	}
	store.getters.doneTodosCount // -> 1
```
**mapGetters**：
```js
	export default {
	  // ...
	  computed: {
	  // 使用对象展开运算符将 getters 混入 computed 对象中
	    ...mapGetters([
	      'doneTodosCount',
	      'anotherGetter',
	      // ...
	    ])
	  }
	}
```
或者
```js
	mapGetters({
	  // 映射 this.doneCount 为 store.getters.doneTodosCount
	  doneCount: 'doneTodosCount'
	})
```
### mutations
**mutations**：vuex提交状态的唯一方式。mutations更像一个事件监听器，当vue中commit了信息之后，相应的mutation才会执行相应的回掉函数。它接受2个参数，state和object。

因为vue是响应式的，所以mutations也应该遵守vue的动态绑定，所以在需要使用mutations前，尽量初始化。或者是添加时使用`vue.set(obj,'new obj', 'value')`或者以新运算符`state.obj = { ...state.obj, newProp: 123 }`

mutations必须是同步函数
```js
	import { mapMutations } from 'vuex'

	export default {
	  // ...
	  methods: {
	    ...mapMutations([
	      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
	    ]),
	    ...mapMutations({
	      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
	    })
	  }
	}
```
### actions
**actions**: actions提交的是mutations，因为mutations是必须为同步状态，actions就提供了一种异步的形式提交mutations，我们可以在active中去做异步处理，并且提交mutation。它接受一个context参数，这个参数具有store对象相同属性和方法，但是并不是store本身
```js
	actions: {
	    increment (context) {
	      context.commit('increment')
	    }
	  }
	
	//或者 使用解值
	actions: { 
	　　increment ({ commit }) { 
	　　　　commit('increment') 
	　　}
	}
```
actions以dispatch来分发
```js
	// 以载荷形式分发
	store.dispatch('incrementAsync', {
	  amount: 10
	})
	
	// 以对象形式分发
	store.dispatch({
	  type: 'incrementAsync',
	  amount: 10
	})
```
组合的actions：
`store.dispatch` 可以处理被触发的action的回调函数返回的Promise，并且store.dispatch仍旧返回Promise
```js
	actions: {
	  actionA ({ commit }) {
	    return new Promise((resolve, reject) => {
	      setTimeout(() => {
	        commit('someMutation')
	        resolve()
	      }, 1000)
	    })
	  }
	}
	// 可以这样触发
	//一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
	store.dispatch('actionA').then(() => {
	　　// ... 
	})
	
	// 也可以这样子触发
	actions: { 
	// ... 
	　　actionB ({ dispatch, commit }) { 
	　　　　return dispatch('actionA').then(() => { 
	　　　　　　commit('someOtherMutation') 
	　　　　}) 
	　　} 
	}
```
### modules
**modules**：Vuex 允许我们将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters、甚至是嵌套子模块——从上至下进行类似的分割。
```js
	const moduleA = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... },
	  getters: { ... }
	}
	
	const moduleB = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... }
	}
	
	const store = new Vuex.Store({
	  modules: {
	    a: moduleA,
	    b: moduleB
	  }
	})
	
	store.state.a // -> moduleA 的状态
	store.state.b // -> moduleB 的状态
```
模块的局部状态
对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态。
```js
	const moduleA = {
	  state: { count: 0 },
	  mutations: {
	    increment (state) {
	      // state 模块的局部状态
	      state.count++
	    }
	  },
	
	  getters: {
	    doubleCount (state) {
	      return state.count * 2
	    }
	  }
	}
```
对于模块内部的 action，context.state 是局部状态，根节点的状态是 context.rootState。
```js
	const moduleA = {
	  // ...
	  actions: {
	    incrementIfOddOnRootSum ({ state, commit, rootState }) {
	      if ((state.count + rootState.count) % 2 === 1) {
	        commit('increment')
	      }
	    }
	  }
	}
```

对于模块内部的 getter，根节点状态会作为第三个参数
```js
	const moduleA = {
	  // ...
	  getters: {
	    sumWithRootCount (state, getters, rootState) {
	      return state.count + rootState.count
	    }
	  }
	}
```
命名空间：
模块内部的 action、mutation、和 getter 现在仍然注册在全局命名空间——这样保证了多个模块能够响应同一 mutation 或 action。你可以通过添加前缀或后缀的方式隔离各模块，以避免名称冲突。你也可能希望写出一个可复用的模块，其使用环境不可控。例如，我们想创建一个 todos 模块：
```js
	// types.js
	
	// 定义 getter、action、和 mutation 的名称为常量，以模块名 `todos` 为前缀
	export const DONE_COUNT = 'todos/DONE_COUNT'
	export const FETCH_ALL = 'todos/FETCH_ALL'
	export const TOGGLE_DONE = 'todos/TOGGLE_DONE'
	// modules/todos.js
	import * as types from '../types'
	
	// 使用添加了前缀的名称定义 getter、action 和 mutation
	const todosModule = {
	  state: { todos: [] },
	
	  getters: {
	    [types.DONE_COUNT] (state) {
	      // ...
	    }
	  },
	
	  actions: {
	    [types.FETCH_ALL] (context, payload) {
	      // ...
	    }
	  },
	
	  mutations: {
	    [types.TOGGLE_DONE] (state, payload) {
	      // ...
	    }
	  }
	}

```
