## let 和 const
在我们开发的时候，可能认为应该默认使用 let 而不是 var，这种情况下，对于需要写保护的变量要使用 const。

然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的修改是很多 bug 的源头
```js
  // bad
  var foo = 'bar';
  
  // good
  let foo = 'bar';
  
  // better
  const foo = 'bar';
```
## 模板字符串
需要拼接字符串的时候尽量改成使用模板字符串:
```js
  // bad
  const foo = 'this is a' + example;
  
  // good
  const foo = `this is a ${example}`;
```

## 箭头函数
优先使用箭头函数，不过以下几种情况避免使用：

1. 使用箭头函数定义对象的方法
```js
  // bad
  let foo = {
    value: 1,
    getValue: () => console.log(this.value)
  }
  
  foo.getValue();  // undefined
```
2. 定义原型方法
```js
  // bad
  function Foo() {
    this.value = 1
  }
  
  Foo.prototype.getValue = () => console.log(this.value)
  
  let foo = new Foo()
  foo.getValue();  // undefined
```
3. 作为事件的回调函数
```js
  // bad
  const button = document.getElementById('myButton');
  button.addEventListener('click', () => {
      console.log(this === window); // => true
      this.innerHTML = 'Clicked button';
  });
```

## Promises
Promise 允许我们消除 “回调地狱” ，虽然它们引入了更多的复杂性（ ES2017 已经带来了 async，用更高级别的概念解决了复杂性问题）。

通过使用 promises，您可以重写以下代码：
```js
  setTimeout(function() {
    console.log('I promised to run after 1s')
    setTimeout(function() {
      console.log('I promised to run after 2s')
    }, 1000)
  }, 1000)
```
使用 promises 重写为：
```js
  const wait = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
  })
  
  wait().then(() => {
    console.log('I promised to run after 1s')
    return wait()
  })
  .then(() => console.log('I promised to run after 2s'))
```

## Classes（类）
传统上，JavaScript 是唯一一个基于原型继承的主流语言。 从基于类的语言切换到 JavaScript 的程序员，发现 JavaScript 很令人费解，但是 ES2015 引入了 Classes（类），这些类只是 JavaScript 内部工作的语法糖，但改变了我们构建 JavaScript 程序的方式。

现在，继承非常简单，类似于其他面向对象的编程语言：
```js
  class Person {
    constructor(name) {
       this.name = name
    }
    hello() {
      return 'Hello, I am ' + this.name + '.'
    }
  }
  class Actor extends Person {
    hello() {
      return super.hello() + ' I am an actor.'
    }
  }
  var tomCruise = new Actor('Tom Cruise')
  tomCruise.hello()
```
以上代码将打印 ： “Hello, I am Tom Cruise. I am an actor.”

Classes(类) 没有显式的类变量声明，但必须在 构造函数(constructor) 中初始化所有变量。

### 构造函数(constructor)
Classes(类) 有一个叫做 `constructor` 的特殊方法，当通过 `new` 初始化一个 class(类) 时会调用它。

### 超类(super)
可以使用 super() 引用父类。

## Modules（模块）
在 ES2015 之前，至少有三个主要的模块标准竞争，这些标准使社区分散：
  - AMD
  - RequireJS
  - CommonJS

ES2015 将这些标准化为通用格式。


### import modules（导入模块）
导入模块是通过 `import ... from ...` 结构完成的：
```js
  import * from 'mymodule'
  import React from 'react'
  import { React, Component } from 'react'
  import React as MyLibrary from 'react'
```

### export modules（导出模块）
您可以编写模块，并使用 export 关键字将任何内容导出给其他模块使用：
```js
  export var foo = 2
  export function bar() { /* ... */ }
```

## 默认参数
函数现在支持默认参数：
```js
  const foo = function(index = 0, testing = true) { /* ... */ }
  foo()
```

## 展开操作符
您可以使用展开操作符 ... 展开数组，对象或字符串。
```js
  const a = [1, 2, 3]
  const b = [...a, 4, 5, 6]
```
spread operator（展开操作符）也适用于对象。用以下方法克隆对象：

```js
  const newObj = { ...oldObj }
```

## 解构赋值
```js
  const person = {
    firstName: 'Tom',
    lastName: 'Cruise',
    actor: true,
    age: 54, //made up
  }
  const {firstName: jia, age} = person
  console.log(jia) // "Tom"
  console.log(age)  // 54
```
`name` 和 `age` 包含了所需的值。

语法也适用于数组：
```js
  const a = [1,2,3,4,5]
  let [first, second, , , fifth] = a;
  console.log(first)   // 1
  console.log(second)  // 2
  console.log(fifth)   // 5
```

## 增强的对象字面量
你不再需要这么做：
```js
  const something = 'y'
  const x = {
    something: something
  }
```
你只需：
```js
  const something = 'y'
  const x = {
    something
  }
```
