# JS数组、字符串常用方法
## 判断是否数组
```js
Array.isArray(value) // value 要检查的值，若符合返回true，否则返回false
```
## 数组包含另一个数组
```js
let a = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = [2, 3];
let c = [1];

function includes(arr1: any[], arr2: any[]) {
  return arr2.every(val => arr1.includes(val));
}

console.log(includes(a, b));
console.log(includes(a, c));
```

## array.some()和array.every()区别？
some() 方法用于检测数组中的元素是否有满足指定条件的，若满足返回true，否则返回false

every() 方法用于检测数组中所有元素是否都符合指定条件，若符合返回true，否则返回false

## push()
push() 向数组尾部添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
```js
   var arr = [1,2,3];
   console.log(arr);        //  [1, 2, 3]
   var b = arr.push(4);  
   console.log(b);          //  4   //表示当前数组长度
   console.log(arr);        // [1, 2, 3, 4]   
```
## pop()
pop() 删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。
```js
   var arr = [1,2,3];
   console.log(arr);                // [1,2,3]
   arr.pop();
   console.log( arr.pop() );　　// [3]　　//返回删除的元素
   console.log(arr);                // [1,2] 
```
## unshift()
unshift() 在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
```js
  var arr = ['a', 'b', 'c'];
  arr.unshift('x');        // 4
  console.log(arr);        // ['x', 'a', 'b', 'c']
```
## shift()
shift() 删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。
```js
  var arr = ['a', 'b', 'c'];
  arr.shift()         // 'a'
  console.log(arr)     // ['b', 'c'] 
```
## indexOf()
indexOf() 返回指定元素在数组中出现的位置，如果没有出现则返回-1。
```js
  var arr = ['a', 'b', 'c'];
  
  arr.indexOf('b') // 1
  arr.indexOf('y') // -1
```
indexOf方法还可以接受第二个参数，表示搜索的开始位置。
```js
  ['a', 'b', 'c'].indexOf('a', 1)     // -1
```
## join()
join() 以参数作为分隔符，将所有数组成员组成一个字符串返回。如果不提供参数，默认用逗号分隔。
```js
 var arr = [1, 2, 3, 4];

 arr.join(' ')     // '1 2 3 4'
 arr.join(' | ')     // "1 | 2 | 3 | 4"
 arr.join()     // "1,2,3,4"
```
## concat()
concat() 方法用于连接两个或多个数组。
```js
  var arr = [1,2,3];
  var b = arr.concat([4,5,6]);
  console.log(b);        //[1,2,3,4,5,6]
```
## reverse()
reverse() 用于颠倒数组中元素的顺序，返回改变后的数组。注意，该方法将改变原数组。
```js
  var arr = ['a', 'b', 'c'];
  
  arr.reverse() // ["c", "b", "a"]
  console.log(arr) // ["c", "b", "a"]
```
## slice()
slice() 用于截取原数组的一部分，返回一个新数组，原数组不变。

slice(start,end)它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。
```js
  var arr = ['a', 'b', 'c'];
  
  arr.slice(0)         // ["a", "b", "c"]
  arr.slice(1)         // ["b", "c"]
  arr.slice(1, 2)     // ["b"]
  arr.slice(2, 6)     // ["c"]
  arr.slice()           // ["a", "b", "c"]    无参数返回原数组
  
  arr.slice(-2)          // ["b", "c"]    参数是负数，则表示倒数计算的位置
  arr.slice(-2, -1)     // ["b"]
```
## splice()
splice() 删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。

splice(start,delNum,addElement1,addElement2,...)第一个参数是删除的起始位置，第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
```js
  var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
  arr.splice(4, 2)     // ["e", "f"]　　从原数组4号位置，删除了两个数组成员
  console.log(arr)     // ["a", "b", "c", "d"]
  
  var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
  arr.splice(4, 2, 'aa', 'bb')     // ["e", "f"]　　原数组4号位置，删除了两个数组成员,又插入了两个新成员
  console.log(arr)         // ["a", "b", "c", "d", "aa", "bb"]
  
  var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
  arr.splice(-4, 2)     // ["c", "d"]    起始位置如果是负数，就表示从倒数位置开始删除
  
  var arr = [1, 1, 1];
  arr.splice(1, 0, 2)     // []    如果只插入元素,第二个参数可以设为0
  conlose.log(arr)     // [1, 2, 1, 1]
  
  var arr = [1, 2, 3, 4];
  arr.splice(2)     // [3, 4] 如果只有第一个参数，等同于将原数组在指定位置拆分成两个数组
  console.log(arr)     // [1, 2]
```
## array.find()
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 ```js
let array1 = [5, 12, 8, 130, 44];

let found = array1.find((item) => {
  return item > 10
})

console.log(found) // 12
 ```

## array.map()
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```js
let arr = [1, 4, 9, 16]

// pass a function to map
const map1 = arr.map((item) => {
  return item * 2
})

console.log(map1)
// expected output: Array [2, 8, 18, 32]
```

## array.filter()
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
```js
let arr = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = arr.filter((item) => {
  item.length > 6
})

console.log(result)
// expected output: Array ["exuberant", "destruction", "present"]
```

## array.reduce()
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

**参数**: 接收两个参数，一个为回调函数，另一个为初始值。回调函数中四个默认参数，依次为积累值、当前值、数组、整个数组。

```js
let nums = [1, 2, 3];
// 多个数的加和
let newNums = nums.reduce(function(preSum, curVal, index, array) {
  return preSum + curVal 
}, 0)
console.log(newNums) // 6
```

### 高级用法
计算数组中每个元素出现的次数
```js
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameNum = names.reduce((pre,cur) => {
  if(cur in pre){ //（变量 in 对象）判断对象是否为数组/对象的元素/属性,返回true或false
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); // {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```