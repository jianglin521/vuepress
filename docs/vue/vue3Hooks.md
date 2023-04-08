# vue3

## 自定义hooks

Vue3的自定义Hook：

虽然官方没有明确指明或定义什么是自定义Hooks，但是却无处不在用；
以函数形式抽离一些可复用的方法像钩子一样挂着，随时可以引入和调用，实现高内聚低耦合的目标；

将可复用功能抽离为外部JS文件

函数名/文件名以use开头，形如：useXX

引用时将响应式变量或者方法显式解构暴露出来如：`const {nameRef，Fn} = useXX()`
（在setup函数解构出自定义hooks的变量和方法）

实例：

简单的加减法计算，将加法和减法抽离为2个自定义Hooks，并且相互传递响应式数据

```js
// 加法功能-Hook
import { ref, watch } from 'vue';
const useAdd= ({ num1, num2 })  =>{
    const addNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        addFn(num1, num2)
    })
    const addFn = (num1, num2) => {
        addNum.value = num1 + num2
    }
    return {
        addNum,
        addFn
    }
}
export default useAdd
```

```js
// 减法功能-Hook
import { ref, watch } from 'vue';
export function useSub  ({ num1, num2 }){
    const subNum = ref(0)
    watch([num1, num2], ([num1, num2]) => {
        subFn(num1, num2)
    })
    const subFn = (num1, num2) => {
        subNum.value = num1 - num2
    }
    return {
        subNum,
        subFn
    }
}
```

```html
<!-- 加减法计算组件 -->
<template>
    <div>
        num1:<input v-model.number="num1" style="width:100px" />
        <br />
        num2:<input v-model.number="num2" style="width:100px" />
    </div>
    <span>加法等于:{{ addNum }}</span>
    <br />
    <span>减法等于:{{ subNum }}</span>
</template>
​
<script setup>
  import { ref } from 'vue'
  import useAdd from './useAdd.js'     //引入自动hook 
  import { useSub } from './useSub.js' //引入自动hook 
  ​
  const num1 = ref(2)
  const num2 = ref(1)
  //加法功能-自定义Hook（将响应式变量或者方法形式暴露出来）
  const { addNum, addFn } = useAdd({ num1, num2 })
  addFn(num1.value, num2.value)
  // 减法功能-自定义Hook (将响应式变量或者方法形式暴露出来)
  const { subNum, subFn } = useSub({ num1, num2 })
  subFn(num1.value, num2.value)
  </script>
```

​
