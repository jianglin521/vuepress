# vue知识点总结
## vue的生命周期
| 生命周期钩子 | 描述 |
| --- | --- |
| beforeCreate | 在实例初始化前，数据观测和event/watcher事件配置之前被调用 |
| created	| 实例被创建完成后调用。在这一步，实例已经完成以下配置：数据观测，属性和方法的运算，watcher/event事件的回调。挂载阶段还没开始，$el属性不可见 |
| beforeMount	| 在挂载之前调用，相关的render首次被调用 |
| mounted |	el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。如果root实例挂载了一个文档内元素，当mounted被调用时vm.el也在文档内 |
| beforeUpdate |	数据更新时调用，发生在虚拟dom重新渲染和打补丁之前。你可以在这个钩子中进一步更改状态，不会触发重渲染过程 |
| updated |	由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。|
| activated |	keep-alive 组件激活时调用。|
| deactivated |	keep-alive 组件停用时调用。|
| beforeDestroy |	实例销毁之前调用。在这一步，实例仍然完全可用。|
| destroyed |	Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。|

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
