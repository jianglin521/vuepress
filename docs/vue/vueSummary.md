# vue知识点总结
## vue的生命周期
| 生命周期钩子  | 描述                                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| beforeCreate  | 在实例初始化前，数据观测和event/watcher事件配置之前被调用                                                                                       |
| created       | 实例被创建完成后调用。在这一步，实例已经完成以下配置：数据观测，属性和方法的运算，watcher/event事件的回调。挂载阶段还没开始，$el属性不可见      |
| beforeMount   | 在挂载之前调用，相关的render首次被调用                                                                                                          |
| mounted       | el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。如果root实例挂载了一个文档内元素，当mounted被调用时vm.el也在文档内                      |
| beforeUpdate  | 数据更新时调用，发生在虚拟dom重新渲染和打补丁之前。你可以在这个钩子中进一步更改状态，不会触发重渲染过程                                         |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。 |
| activated     | keep-alive 组件激活时调用。                                                                                                                     |
| deactivated   | keep-alive 组件停用时调用。                                                                                                                     |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。                                                                                                  |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。                                |

## 双向数据绑定原理
vue内部通过`object.defineProperty`方法属性拦截的方式，把data对象的每个数据读写转化为`getter/setter`，当数据变化通知视图更新。

## vue修饰符
* .lazy

  在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：

* .number（v-model）

  将输入的输入值自动转化为数值类型

* .trim（v-model）

  过滤用户输入的首尾空白字符

```html
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>

  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>

  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>

  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>

  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>

  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
```

## 子组件单独修改父组件值
```vue
<!-- parent.vue -->
<child :title.sync="title"></child>

<!-- child.vue -->
export defalut {
    props: {
        title: String  
    },
    methods: {
        changeTitle(){
            this.$emit('update:title', 'hello')
        }
    }
}
```

## provide/inject
```vue
<!-- 父组件向子组件传入依赖 -->
<!-- App.vue -->
export default {
    provide() {
        return {
            app: this
        }
    } 
}
<!-- child.vue -->
export default {
    inject: ['app'],
    created() {
        console.log(this.app) // App.vue实例
    }
}
```


## vue上传图片
```js
 <input type="file" ref="fileInput" accept="image/*" @change="uploadFile"/>

  async uploadFile() {
    const file = this.$refs.fileInput.files[0]
    let formData = new FormData()
    formData.append('file', file)
    formData.append('maxwidth', 2000) // 额外参数
    const { data } = await apiUploadFiles(formData)
    console.log(data, '我是返回数据')
  }
```
## vue下载文件

```js
  // 注意：axios请求中添加 {responseType: 'blob'}
  let blob = new Blob([data])
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob) //创建下载的链接
  downloadElement.href = href
  downloadElement.download = 'xxx.txt' //下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() //点击下载
  document.body.removeChild(downloadElement) //下载完成移除元素
  window.URL.revokeObjectURL(href) //释放blob对象
```

## mockjs影响文件下载
在mockjs版本为`1.1.0`时候影响文件流下载,将版本降为`0.1.10`可解决

## vue动画
```html
<!-- 一个命名为fade的<transition>标签包裹着类名为h的<div> -->
<transition name="fade">
    <div class="test" v-if="show">hello world</div>
</transition>

<style>
/* div的初始状态*/
.test {
    width:100px;
    height: 200px;
    background-color: aqua;
}

/**
* 定义进入动画和退出动画的过程
* 代表关注的是height的变化，动画的时间是5
*/
.fade-enter-active, .fade-leave-active {
    transition: height 5s;
}

/* 定义进入动画的初始状态*/
.fade-enter {
    height: 0;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
    height: 200px;
}

/* 定义离开动画的初始状态*/
.fade-leave {
    height: 200px;
}

/* 定义离开动画的结束状态*/
.fade-leave-to {
    height: 0;
}
</style>
```

## 电话加密
```js
/* 电话加密 */
Vue.filter('tel-encryption', function(value) {
  if (!value) {
    return ''
  }
  return value.substr(0, 3) + '****' + value.substr(7)
})
```
**注意**
`substr()` 方法返回一个字符串中从指定位置开始到指定字符数的字符。

语法：`str.substr(start[, length])`

参数:

  1. `start`
  开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。

  2. `length`
  可选。提取的字符数。


