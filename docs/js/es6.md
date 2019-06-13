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

## Promise
ES6新增Promise对象的支持，Promise提供统一的接口来获取异步操作的状态信息，添加不能的处理方法。
Promise对象只有三种状态：

`pendding`: 初始状态，既不是成功，也不是失败状态。

`fulfilled`: 意味着操作成功完成。

`rejected`: 意味着操作失败。

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
### promises.finally
任何情况下都会执行的，一般写在 catch 之后

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
export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

另外export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

所以看例子
```js
  // 正确
  var a = 1;
  export default a;
   
  // 错误
  export default var a = 1;
```
上面错误的如果把export default改为export就正确了，看
```js
  // 正确
  export var a = 1;
```
因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后

```js
  // 正确
  export default 123;
  // 报错
  export 123;
```
上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定外对接口为default。

**注意**：同一个模块中可以有多个export导出语句，但是最多只能有一个export default默认导出语句，但是可以有一个export default和几个export导出语句同时存在。

**注意**：

export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

### import命令
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

并从中输入变量。import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。

看例子：

```js
  import {sum} from 'index.js';
  import {sum,age,name} from 'index.js';
  import {sum as hg, age as nl, name as xm} from 'index.js';
```
上面的几种都是正确的写法，export输出的变量或者函数，import接收的时候必须加{}，不加就会报错

使用export default命令定义的模块的对外接口，import命令加载该模块的时候

看个例子
```js
  export default function(){
    console.log("leo");
  }//第一个
  export default function foo(){
    console.log("leo");
  }//第二个
  let a = 1;
  export default a;//第三个
  //导入的时候
  import foo  from 'index.js';

```
上面的例子中，导入的名字可以是foo，也可以是任意的名字，同时也无需把名字放在{}中，**但要注意的是，export default在一个模块中只能存在一个，多了会报错，上面我们只是举例方便**

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
```js
  import foo, { age, name as xm,sum as qh} from 'index.js';
```
**总结一下：**
- import只会导入一次，无论你引入多少次
- 有提升效果，import会自动提升到顶部，首先执行
- import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。如果脚本加载了变量，对其重新赋值就会报错，因为变量是一个只读的接口。但是，如果是一个对象，改写对象的属性是允许的。（对象只能改变值但不能改变引用）
- 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
- import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
- 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。





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
