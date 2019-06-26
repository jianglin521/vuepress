# JS异步
## js事件循环

JS引擎一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

![js事件循环](https://i.loli.net/2019/06/12/5d00c12316f8139363.png)

## 回调函数
```js
function A (data) { // 函数A
  console.log(data,'结束了')
}
function B (callback) { // 函数B
  setTimeout(function () {
    let data = 100
    callback(data)
  }, 3000)
  console.log('开始了')
}
B(A)
```

## Async/await
async顾名思义是“异步”的意思，async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。并且await只能在async函数中使用

通常async、await都是跟随Promise一起使用的。为什么这么说呢？因为async返回的都是一个Promise对象同时async适用于任何类型的函数上。这样await得到的就是一个Promise对象(如果不是Promise对象的话那async返回的是什么 就是什么)；

await得到Promise对象之后就等待Promise接下来的resolve或者reject。

来看一段简单的代码：

```js
async function testSync() {
  const response = await new Promise(resolve => {
    setTimeout(() => {
      resolve('async await test...')
    }, 5000)
  })
  console.log(response)
}
testSync() // async await test...
```
就这样一个简单的async、await异步就完成了。使用async、await完成异步操作代码可读与写法上更像是同步的，也更容易让人理解。

### async、await串行、并行处理
**串行**：等待前面一个await执行后接着执行下一个await，以此类推

```js
async function awaitFn(str) {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str)
    }, 2000)
  })
  return response
}

const serialFn = async() => { // 串行执行
  console.time('serialFn')
  console.log(await awaitFn('string 1'))
  console.log(await awaitFn('string 2'))
  console.timeEnd('serialFn')
}

serialFn()
```
**并行**：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。

```js
async function awaitFn(str) {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str)
    }, 2000)
  })
  return response
}

const parallelFn = async() => { // 并行执行
  console.time('parallelFn')
  const parallelOne = awaitFn('string 1')
  const parallelTwo = awaitFn('string 2')

  //直接打印
  console.log(await parallelOne)
  console.log(await parallelTwo)

  console.timeEnd('parallelFn')
}
parallelFn()
```
### async、await错误处理
JavaScript异步请求肯定会有请求失败的情况，上面也说到了async返回的是一个Promise对象。既然是返回一个Promise对象的话那处理当异步请求发生错误的时候我们就要处理reject的状态了。

在Promise中当请求reject的时候我们可以使用catch。为了保持代码的健壮性使用async、await的时候我们使用try catch来处理错误。

```js
async function catchErr() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('出现错误了'))
      }, 2000)
    })
  } catch (err) {
    console.log(err)
  }
}
catchErr()
```