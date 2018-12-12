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
## ES6中的模块化
注意：ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

### export命令
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

export可以输出变量、函数和类，切记不可直接输出值，否则会报错，因为export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

看个例子
```js
  export let name = 'leo';
  export let age= 30;
  //也可以按照下面的写法，两种写法都一样
  let name= 'leo';
  let age= 30;
  export {name, age};
```
建议使用下面的方法，因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量

export命令除了输出变量，还可以输出函数或类（class）
```js
  export function sum(x, y) {
    return x + y;
  };
  //也可以按照下面的方法
  function sum(x, y) {
    return x + y;
  };
  export {sum}
```
上面代码对外输出一个函数sum。

通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。

```js
  let name= 'leo';
  let age= 30;
  function sum(x,y){
    return x+y;
  }
  export {
     name as  xm,
     sum as  qh1,
     sum  as  qh2
  }
```
上面代码使用as关键字，重命名了函数name和sum的对外接口。重命名后，sum可以用不同的名字输出两次。

**注意**：export不能输出值，并且它输出的变量函数名或者类名要放在大括号中({})

下面的几种写法是错误的
```js
  export 1;//报错，是个值，没有提供接口
   
  var m = 1;
  export m;//报错,要放在大括号中
   
  function sum(x,y){
    return  x+y;
  }
  export sum;//报错，要放在大括号中
  //正确的写法，以函数为例
  export {sum}
  export {sum as qh}
```
注意，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

### export default命令
export default为模块指定默认输出。

先看例子，了解一下它的使用方法
```js
  export default function () {
    console.log('foo');
  }//第一种写法
   
  export default function foo() {
    console.log('foo');
  }//第二种写法
   
  //也可以是下面的写法
  function foo() {
    console.log('foo');
  }
   
  export default foo;
```
未完成---------


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
