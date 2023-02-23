# Vue3.0学习笔记

![Vue3.0学习笔记](http://43.143.190.137:5000/images/2023/02/23/20230223153615.webp)

## 为什么要有 Vue3.0

1. Vue2.0对TypeScript的支持不够友好
2. Vue2.0中，重复的含有响应式数据的逻辑复用时采用 mixins 方法不够灵活和方便。Options API中，可以看到多个处理逻辑在 data、methods、computed和watch都有涉及，杂糅在了一起。Composition API尤大大暂时将其翻译为“组合API”，每个处理逻辑可以各自成为一个模块，对外暴露API。这些模块模块同普通ES6模块类似，但是其中使用了响应式数据或者Vue3.0内置的方法。这样，我们需要使用某块逻辑的时候，只需要将这些模块组合起来。同时，逻辑修改的时候只需要修改对应的模块即可。

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![img](http://43.143.190.137:5000/images/2023/02/23/20230223153753.webp) | ![img](http://43.143.190.137:5000/images/2023/02/23/20230223153648.webp) |

## Vue3.0 的新特性

Vue3.0 官网地址：[v3.vuejs.org/](https://link.juejin.cn/?target=https%3A%2F%2Fv3.vuejs.org%2F)

### 数据响应

我们知道在 Vue3.0 之前的对象数据响应式的原理是 Object.defineProperty(), 数组的响应式原理是拦截了数组的7个方法（包括 push、pop、shift、unshift、 splice、 sort、 reverse）。这种方式存在的问题是对于对象，我们无法直接检测到属性的新增和删除；对于数组我们无法检测到直接去修改数组下标对应的内容以及利用 length 修改数组的长度。

Vue3.0的数据响应的原理是利用 Proxy 实现的。Proxy在ES2015规范中被正式发布，它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

- Proxy 可以直接监听对象而非属性。因此对象的属性新增和删除也可以被监听。
- Proxy 可以直接监听数组的变化。因此数组直接修改下标的内容以及长度也可以被监听。
- Proxy 有多达13种拦截方法，不限于apply、deleteProperty、has等

### diff算法

相比于Vue2.0中diff算法优化在于增加了静态分析，将节点分为静态节点和非静态节点。静态节点指的是没有绑定响应式数据的节点，Vue2.0中diff算法的单位是组件，在Vue3.0中，将组件的渲染模板根据非静态节点划分为一个个block“块”，diff算法的单位是一个个block，渲染只与动态内容的多少有关，与静态内容无关。无论层级嵌套多深，它的动态节点都直接与Block根节点绑定，无需再去遍历静态节点。

### 对 TypeScript 的友好支持

用过的都说好。

### 允许一个组件可以有多个根节点

利用 Fragment 实现了一个组件可以有多个根节点。Fragment“碎片”虚拟元素，并不会渲染到html中。

```html
<template>
  <div>Hello</div>
  <div>World</div>
</template>

```

### `Composition API`

### 性能提升

- 重写了虚拟Dom的实现（且保证了兼容性，脱离模版的渲染需求旺盛）。
- 编译模板的优化。
- 更高效的组件初始化。
- update性能提高 1.3~2 倍。
- SSR速度提高了 2~3 倍。

### Tree shaking support

Tree shaking更好的支持，很多时候，我们并不需要 vue提供的所有功能，在 vue 2 并没有方式排除掉，但是 3.0 都可能做成了按需引入。

[zhuanlan.zhihu.com/p/134302690](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F134302690)
[zhuanlan.zhihu.com/p/191216161](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F191216161)

## 创建一个项目

### Vite 方式

本地已经安装过 node.js 后，使用下面的命令创建一个项目：

```bash
  npm init vite-app <project-name>
  cd <project-name>
  npm install
  npm run dev
```

### CLI 方式

先全局更新我们的 Vue-Cli

```ruby
  npm install -g @vue/cli
```

使用 Vue-Cli 命令创建项目：

```lua
vue create cli-demo

```

按照默认配置也可以自定义各项配置。我们这里会选择支持 TypeScript 的选项。

我们也可以通过加载 CDN 或者 Webpack 中加载 Vue3.0 去使用。详情 [v3.vuejs.org/guide/insta…](https://link.juejin.cn/?target=https%3A%2F%2Fv3.vuejs.org%2Fguide%2Finstallation.html)

### Vite 和 Webpack 打包对比

Vite 是尤大神亲自编写的打包工具，我们先来看看 Vite 的特点：

- 快速的冷启动
- 即时的模块热更新
- 真正的按需编译

webpack 会根据各个模块的依赖关系先打包，然后启动开发服务器，浏览器请求页面时直接返回打包后的结果。

Vite 则是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。Vite 的按需编译利用的是现代浏览器本身就支持 ES Module，浏览器会自动向依赖的 Module 发出请求。 Vite 充分利用了这一点。Vite 编译后的文件保留了原生的 Import 的语句，浏览器看到 import 后会再去向服务器请求这些 import 的文件。各个文件的依赖关系由浏览器自动处理的。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55aa25abbf1340f6a10587aca425416b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 下图是 Vite 项目请求的资源信息： ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd6f0a9884bd48ccb43b4ea29e41a59b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 下图是 webpack 项目启动后资源请求信息： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63ab1d1d4e73497883731e76e27d2b00~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 对比可以看出，Vite 项目直接请求的我们项目代码文件，而 webpack 则请求的是打包编译后的文件。所以，Vite 启动速度是非常快的，同时也是按需动态编译。按需编译的方式，极大的缩减了编译时间，项目越复杂，模块越多，Vite 的优势越明显。

原理：Vite 内部借用了 koa 来启动一个服务。去代理这些模块。通过拦截请求然后动态编译各种类型的文件。

在 HMR（热更新）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像 webpack 那样需要把该模块的相关依赖全部编译一次，效率更高。
当需要打包到生产环境时，Vite 使用传统的 rollup 进行打包。因此，Vite 的主要优势在开发阶段。

[blog.csdn.net/qq_41499782…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fqq_41499782%2Farticle%2Fdetails%2F109593388) [zhuanlan.zhihu.com/p/150083887](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F150083887)

## 磨刀

磨刀不误砍柴工，这里推荐 2 款 VSCode 中好用的插件

### ESLint

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99320314c33145d78a0ad40ed61598e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
如果安装后不生效的话，可以在项目根目录下创建 .vscode 文件夹，在里面创建 settings.json 文件，内容如下：

```json
//settings.json
{
    "eslint.validate": ["typescript"]
}

```

重启后生效。我们可以尝试一下，随便定义一个变量，会有 eslint 的提示，如下： ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b2feb8a87134d6e80d86b38b1ecd443~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

一个是告诉我们变量 a 只是定义了没有使用，另一个是告诉我们 a 没有被重新赋值过，应该使用 const 来定义。使用 eslint 提高我们编写代码的规范。

### Vetur

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a91d180755d54fb3b56e4b45d0e9c383~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

可以让我们的 vue 文件不同颜色显示标签，同时当我们输入的时候给我们智能提示。

## 语法部分

### setup 函数

在 Vue3 中提出了 Composition API 的概念。Vue 2.0 种我们通过 props、data、methods 等来定义组件， 在 Vue3.0 中使用 setup 定义响应式的数据和方法。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2e4d4aac2d647e88edcc25078955e88~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

```html
<template>
    <h3>欢迎来到我的掘金</h3>
    <button v-for="(item, key) in data.languages" :key="key" @click="selectLangFun(key)">{{item}}</button>
    <p>你选择的课程是【{{selected}}】</p>
</template>

<script lang="ts">
import { reactive, ref} from "vue";
export default {
    name: "ProgramSelect",
    setup() {
        const data = reactive({
            languages: ["Java", "Javascript", "C#"]
        });
        const selected = ref("");
        const selectLangFun = (params: number): void => {
            selected.value = data.languages[params];
        }
        return {
            data,
            selected,
            selectLangFun
        }
    }
}

```

- setup(props, context)函数其实有 2 个参数，props 对应 Vue 2 中 props， 里面定义的父组件传递给子组件的变量；setup 函数中没有暴露 this，context 对应于 Vue 2 中 this 对象。更多具体使用方法后面介绍。
- 所有在 template 模板中使用的变量都需要通过 setup 函数 return 出去。
- 通过 reactive 和 ref 来创建响应式的变量。两者的区别是 reactive 创建的是对象变量的响应式，而 ref 用来创建基本类型的响应式。
- ref 创建的变量 selected 修改值的时候要加上 value。Vue3 内部会将简单类型如字符串"hello"，动态转为一个对象，具有 value 属性，值是"hello"。
- 所有在模板中要使用的数据、方法需要 return 出去。

### toRef 和 toRefs

上面我们介绍了 reactive 和 ref 的一些基本使用，这里介绍 toRef 和 toRefs 使用技巧。部分代码会使用 TS 语法，不太熟悉的同学，可以先学习下这篇博客 [juejin.cn/post/690313…](https://juejin.cn/post/6903135012963483656)

#### toRef

toRef() 是一个函数，返回一个 ToRef 对象。使用语法是 const result = toRef(target, "key");

- ToRef 对象并不是 Ref 对象；我们通过 ref() 函数创建的对象一定是响应式的数据，数据被修改了，会直接反应在页面上。
- ToRef 对象不一定是响应式的数据，这个要看 target 的数据是否是响应式的。
- target 如果是响应式对象（reactive 或者 ref 创建的对象）的话，那么 result 也是响应式对象。
- toRef() 函数是对 target 的一种映射；result 的内容修改的时候，target 也会被修改；反过来也是一样的，target 被修改了，result 内容也会被修改。

```html
<template>
    <p>{{a}} <button @click="changeA">changeA</button></p>
    <p>{{objRef}} <button @click="change">change</button></p>
    <p>{{reactiveRef}} <button @click="changeReactive">changeReactive</button></p>
</template>
<script lang="ts">
import { toRef, reactive, ref} from 'vue'

export default {
    setup(){
        //普通对象
        const obj = {name: "zhangsan", age: 12}
        const objRef = toRef(obj, "name");
        //响应式对象
        const a = ref("hello");
        //响应式对象
        const reactiveObj = reactive({name: "Willim", age: 6});
        const reactiveRef = toRef(reactiveObj, "name");
        const changeA = function(){
            //会响应到页面上
            a.value = "Vue 3.0";
        }
        const change = function(){
            //会影响 obj 的值，但是不会响应到页面上
            objRef.value = "lisi";
            console.log(obj);
        }
        const changeReactive = function(){
           //会影响 reactiveObj 的值，但是不会响应到页面上
            reactiveRef.value = "lisi";
            console.log(reactiveObj);
        }
        return{
            objRef,
            reactiveRef,
            change,
            changeReactive,
            a,
            changeA
        }
    }
}
</script>

```

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14da152d3f1d4c74b14bb6b353fac32d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
点击 changeA 会立即响应到页面上；点击 change 并不会立即响应到页面；当我们点击 changeReactive 按钮的时候由于改变了响应式的数据，所以会导致 update 页面上的数据，所以 zhangsan 和 Willim 都被更新。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b84ddc5028d74f9185fb2eb5d9026b2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 上面的截图是我们打印 objRef 和 reactiveRef 两个变量的值看到的结果。可以看到 result 的自定义属性 _object 就是 target，它们是通过_object 保持了 新值 result 和 原始值 target 的映射。
- 同时可以看到 reactiveObj 是响应式的对象，在 _object 属性上是 Proxy 对象。

总结一下：toRef() 的设计初衷应该是想和 Ref() 函数类似，Ref() 是将一个基础类型的变量进行响应式化（返回一个具有 value 属性的对象），而 toRef() 则是从对象中剥离出属性来（返回一个具有 value 属性的对象），如果原始对象是响应式的，那么剥离出的属性也是响应式的；如果原始数据不是响应式，那么剥离出来的属性就是普通对象了，不具响应式的作用。

#### toRefs

先思考一个问题：Proxy 对象结构后是什么样子的呢？

```javascript
  const target = {name: 'zs'};
  const handler = {
      get: function(obj, prop){
          return prop in obj ? obj[prop]: 18
      }
  }
  const p = new Proxy(target, handler)
  const pp = {...p};
  console.log(target, pp, p);

```

我们定义了 p 是 Proxy 对象，但是经过 ... 解构以后的新对象 pp 已经不是 Proxy 对象了。反映到 Vue 3.0 中， reactive() 函数会返回 Proxy 响应式的对象，但如果直接解构 reactive() 创造的变量的话，那返回的数据也将不是 Proxy 对象了，导致其不具有响应式的特点了。toRefs() 的出现解决了这个问题哦。
![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab18f03978a45028eb4403f0d9ae5ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- toRefs() 函数与 toRef() 很相似。toRef() 剥离的是对象的某个属性，toRefs() 剥离的是对象的所有属性，返回一个新对象。
- toRefs() 函数用法是 const result = toRefs(target); target 的每个属性都会被转换为 ToRef 对象。
- 同 toRef() 一样，如果原始数据 target 具有响应式的，那么 result 也是响应式；如果 target 是普通对象，那么 result 也是普通对象，不具有响应式。
- 由于 toRefs() 函数返回的是一个对象，对象每个属性都是 ToRef 对象。我们知道 ... 解构对象是浅拷贝，所以使用 toRefs() 函数，我们可以对响应式的数据进行解构。来一个例子

```html
<template>
    <p>我是 {{name}}，年龄{{age}} <button @click="change">change</button></p>
</template>
<script>
import {reactive, toRefs} from 'vue';
export default {
    setup(){
        const data = reactive({
            name: "Willim",
            age: 6,
            change: ()=>{
                data.age++;
            }
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>

```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad3ecead07e04638abafb6cb07e4fa1e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### computed

我们可以使用 computed 对响应式的变量进行处理，返回一个 ComputedRef 类型的变量。

```javascript
  let doubleCount = computed(()=>{
      return data.count * 2;
  })

```

### watch

Vue 3.0 中的 watch 函数可以监听多个变量哦，监听某个变量变化时增加需要处理的逻辑（可以理解为这个变量变化的副作用）；或者监听多个变量的变化。用法示例如下：

```javascript
//监听一个变量
watch(selected, (newVal, oldVal)=>{
    console.log("newVal", newVal);
    console.log("oldVal", oldVal);
    document.title = newVal;
});

//监听多个变量
watch([selected, ()=>data.count], (newVal, oldVal)=>{
    console.log("newVal", newVal);
    console.log("oldVal", oldVal);
    document.title = newVal[0] +","+ newVal[1];
});

```

- `watch(arg, (newVal, oldVal)=>{})` 可以只监听一个响应式的变量 arg，第二个参数是回调函数，当 arg 改变的时候，副作用的函数逻辑。newVal 表示变量修改后的值，oldVal 表示变量的旧值。
- `watch([arg1, arg2,...], (newVal, oldVal)=>{})` 也可以监听多个响应式的变量 arg1、arg2 等，第二个参数是回调函数，当 arg1、arg2...任意一个改变的时候，副作用的函数逻辑。newVal 表示变量修改后的值，这个时候以数组的形式显示，与变量 arg1、arg2...一一对应；oldVal 表示变量的旧值，以数组的形式显示，与变量 arg1、arg2...一一对应
- selected 是 ref 函数创建的变量，我们可以直接监听。
- data 是 reacitve 函数创建的变量，我们只想监听某个属性（count），需要写成函数获取的形式。

### 生命周期

使用了 setup 函数，大家一定很好奇 Vue2.0 中的声明周期函数都去哪了呢？
其实，Vue2.0 原来的声明周期函数我们仍然可以在 Vue3.0 中使用，同时，Vue3.0 也定义了一套生命周期函数与 Vue2.0 一一对应。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/100fcb959ee9465e825b277ec5e112ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

| Options API                       | Hook inside `(setup)`          |                                                              |
| --------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| beforeCreate                      | Not needed*                    | 异步请求初始化的数据                                         |
| created                           | Not needed*                    |                                                              |
| beforeMount                       | onBeforeMount                  | 组件挂载到节点上之前执行的函数                               |
| mounted                           | onMounted                      | 组件挂载完成后执行的函数                                     |
| beforeUpdate                      | onBeforeUpdate                 | 组件更新之前执行的函数                                       |
| updated                           | onUpdated                      | 组件更新完成之后执行的函数                                   |
| beforeUnmount (~~beforeDestroy~~) | onBeforeUnmount                | 组件卸载之前执行的函数                                       |
| unmounted (~~destoryed~~ )        | onUnmounted                    | 组件卸载完成后执行的函数                                     |
| errorCaptured                     | onErrorCaptured                | 当捕获一个来自子孙组件的错误时被调用                         |
| renderTracked(+)                  | onRenderTracked((event)=>{})   | 状态跟踪，setup函数中定义的响应式的数据任意一个发生变化时执行,event包含所有的响应式的变量 |
| renderTriggered(+)                | onRenderTriggered((event)=>{}) | 状态跟踪，setup函数中定义的响应式的数据任意一个发生变化时执行,event 只包含发生变化的数据变量 |

- setup 是around beforeCreate and created 中运行，所以我们之前需要在 vue2.0 中 beforeCreate and created 定义逻辑可以直接定义在 setup 中。
- onX 要先 import 后再 setup 函数中定义。
- Options API 与 setup() 函数是同级的，并且不需要导入

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  },
  created(){
    console.log("created")
  },
  beforeCreate(){
      console.log("beforeCreate")
  },
  beforeMount(){
      console.log("beforeMount")
  },
  mounted(){
      console.log("mounted")
  }
}

```

- Vue2.0 和 Vue3.0 的加载顺序是：setup() -> beforeCreate -> created -> onBeforeMount -> beforeMount -> renderTracked -> onMounted -> mounted
- Vue2.0 和 Vue3.0 的更新顺序是：renderTriggered -> onBeforeUpdate -> beforeUpdate -> renderTracked -> onUpdated -> updated
- Vue2.0 和 Vue3.0 的组件卸载顺序是：onBeforeUnmount -> beforeUnmount -> onUnmounted -> unmounted

## Composition API

用于公共逻辑的提取，提高可复用性。在 Vue2.0 中我们可以使用mixins的方式提取一些公共处理逻辑。以记录用户点击屏幕位置为例来说明，显示每次用户鼠标点击屏幕的位置。不考虑代码的复用性，我们会直接写出下面的代码：

```html
<template>
  <p>X: {{x}}, Y: {{y}}</p>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
    const pointer = reactive({
      x: 0,
      y: 0
    });
    const updateMouse = (e: MouseEvent)=>{
      pointer.x = e.pageX;
      pointer.y = e.pageY;
    };
    onMounted(()=>{
      document.addEventListener("click", updateMouse)
    })
    onUnmounted(()=>{
      document.removeEventListener("click", updateMouse)
    })
    return{
      ...toRefs(pointer)
    }
  }
});
</script>

```

在Vue3.0中，我们可以考虑把这块获取当前时间的逻辑提取出来，成为一个公共的模块。这个模块与普通Javascript模块类似，只是代码里使用了Vue3.0响应式的变量和Vue3.0内置的方法，通常会将响应式的变量返回出去。实现方法如下：

```javascript
//新建文件夹 hooks，并新建文件 useMousePosition.ts
import { reactive, onMounted, onUnmounted } from 'vue';
function useMousePosition(){
    const pointer = reactive({
        x: 0,
        y: 0
      });
      const updateMouse = (e: MouseEvent)=>{
        pointer.x = e.pageX;
        pointer.y = e.pageY;
      };
      onMounted(()=>{
        document.addEventListener("click", updateMouse)
      });
      onUnmounted(()=>{
        document.removeEventListener("click", updateMouse)
      });
      return pointer;
}
export default useMousePosition;

```

那么我们在 App.vue中只需要导入 useMousePosition 方法，并使用即可。

```html
<template>
  <p>X: {{x}}, Y: {{y}}</p>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs} from 'vue';
//导入 useMousePosition
import useMousePosition from './hooks/useMousePosition';
export default defineComponent({
  name: 'App',
  setup(){
    const pointer = useMousePosition();
    return{
      ...toRefs(pointer)
    }
  }
});
</script>

```

## Teleport组件

teleport翻译过来是“(被)远距离传送”。Teleport组件设计的目的是将某个组件挂载在指定的元素上。在 Vue3.0 以前，我们所有的组件都被挂载在根节点上如id是app的div，其他组件会一层层嵌套在整个html节点树上。 Vue3.0 的Teleport组件可以让我们将某个组件挂载在指定节点上，比如跟根节点app同级的节点上，让代码的实现更符合我们的习惯，而不是层层嵌套在app节点上。以弹出框组件为例说明Teleport组件使用。

```html
<!-- index.html文件-->
  <body>
    <div id="app"></div>
      <!-- 新增modal节点-->
    <div id="modal"></div>
  </body>

```

- 新建 Modal.vue 文件，Vue3.0的组件将 emits 抽出来，使逻辑更加清晰；并能通过 payload.type校验传递进来的数据。
- teleport中的 to 指定将要挂载的元素，这里是id为modal的元素。

```html
// Modal.vue 文件
<template>
  <teleport to="#modal">
  <div id="center" v-if="isOpen">
      <h1><slot>标题</slot></h1>
      <button @click="close">close</button>
  </div>
  </teleport>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        isOpen: Boolean
    },
    emits: {
        'close-modal': (payload: any)=>{
            return payload.type === "close"
        }
    },
    setup(props, context){
        const close = function(){
            context.emit("close-modal", {type: "close"});
        }
        return {
            close
        }
    }
})
</script>
<style scoped>
    #center{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 200px;
        height: 200px;
        border: 1px solid #cccccc;
        background: white;
        margin: auto;
    }
</style>

```

在任意组件中使用 Modal 组件。

```html
<template>
    <p>是我<button @click="showModal">显示弹出框</button></p>
    <Modal :isOpen="openFlag" @closeModal="close">
        <slot>this is title</slot>
    </Modal>
</template>
<script lang="ts">
import {ref} from 'vue'
import Modal from "./Modal.vue";
export default {
    components: {
        Modal
    },
    setup(){
        const openFlag = ref(true);
        const close = function(){
            openFlag.value = false;
        }
        const showModal = function(){
            openFlag.value = true;
        }
        return{
            openFlag,
            close,
            showModal
        }
    }
}
</script>

```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cad6102e61ba4e119b32518c7b612e78~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## Suspense组件

Suspense 是Vue3推出的一个内置特殊组件，用来定义具有异步请求数据的组件的显示。如果使用 Suspense，要 setup函数中需要返回一个 promise。

### 例1

新建 AyncShow.vue 文件，setup函数需要返回一个Promise对象。

```html
<template>
    <h1>{{result}}</h1>
</template>
<script lang="ts">
export default {
    setup(){
        return new Promise((resoluve)=>{
            setTimeout(()=>{
                resoluve({result: 100})
            }, 2000)
        })
    }
}
</script>

```

在App.vue文件中使用

```html
<template>
  <Suspense>
      <template #default> 
        <div>
          <AsyncShow/>
        </div>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs} from 'vue';
import AsyncShow from './components/AsyncShow.vue';
export default defineComponent({
  name: 'App',
  components: {
    AsyncShow
  }
});
</script>

```

- Suspense组件内置了两个具名插槽slot,一个是default，用来显示异步组件请求成功的内容；一个是fallback用来显示异步组件请求响应前页面显示的内容。
- default插槽可以有多个组件，但是需要有一个根节点。

### 例2

模拟发送异步请求完成后，显示组件。这里先介绍一个好用的后端请求接口：[dog.ceo/dog-api/](https://link.juejin.cn/?target=https%3A%2F%2Fdog.ceo%2Fdog-api%2F) 来随机获取狗狗的图片。首先我们先封装一个ajax的get请求方法：

```javascript
//ajax.ts
function getAjax(url: string){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.response)
                }else{
                    reject(xhr.response);
                }
            }
        }
        xhr.onerror = ()=>{
            reject(xhr.response);
        }
    });
}
export default getAjax;

```

再封装一个请求狗狗图片的组件：

```html
//DogShow.vue 
<template>
    <img :src="rawData">
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import getAjax from '../ajax';
export default defineComponent({
    async setup(){
    const p = getAjax("https://dog.ceo/api/breeds/image/random");
    let rawData;
    await p.then((result) =>{
        const tmp = JSON.parse(result as string);
        if(tmp.status==="success"){
            rawData = tmp.message;
        }
    })
    return {
        rawData
    }
}
})
</script>

```

在 App.vue 中使用

```vue
<template>
  <Suspense>
      <template #default> 
        <div>
          <AsyncShow/><DogShow/>
        </div>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
  </Suspense>
  <p>{{error}}</p>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onErrorCaptured} from 'vue';
import AsyncShow from './components/AsyncShow.vue';
import DogShow from './components/DogShow.vue';
export default defineComponent({
  name: 'App',
  components: {
    AsyncShow,
    DogShow
  },
  setup(){
    const error = ref(null);
    onErrorCaptured((e: any)=>{
      error.value = e;
      return true;
    })
    return{
      error,
    }
  }
});
</script>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11ca87175d4446dcab514be5be4bc322~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
在onErrorCaptured函数中监听了错误，比如我们的url故意写错验证一下。onErrorCaptured的时候不能在 DogShow 组件中catch异常，不然在父组件App.vue中无法捕获。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eac73c9b1565413380fbd6e8af07a359~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## defineComponent

defineComponent为了支持 TypeScript 存在的。defineComponent并没有实现特殊逻辑，可以将传入的对象获得对应的类型。我们使用defineComponent定义的组件可以很好的支持 setup、props等的类型提示。
