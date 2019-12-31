## JS运算符`&&`和`||`
### && (逻辑与)
`&&`运算遇到false就返回。
```js
	var a = 1 && 2 && 3;//3
	var b = 0 && 1 && 2;//0
	var c = 1 && 0 && 2;//0
	alert(a),alert(b),alert(c);
```
例如： a && b ,如果 a 为true，直接返回b，而不管b为true或者false 。如果 a 为false，直接返回a

### ||（逻辑或)
`||`运算遇到true就返回。
```js
  var a = 0 || 1 || 2;//1
  var b = 1 || 0 || 3;//1
  alert(a),alert(b);
```
例如：a || b ,如果 a 为false，直接返回b，而不管b为true或者false 。如果 a 为true，直接返回a

### 优先级
&& (逻辑与) 和 ||（逻辑或）混合使用的时候要注意他们的优先级：

&& (逻辑与) 优先级高于 ||（逻辑或）

## 获取时间
### moment获取时间
```js
/* 获取当天  */
moment().format('YYYY-MM-DD')

/* 获取本周 */
moment().week(moment().week()).startOf('week').format('YYYY-MM-DD')   // 这样是年月日的格式
moment().week(moment().week()).endOf('week').valueOf() // 这样是时间戳的格式

/* 获取本月 */
moment().month(moment().month()).startOf('month').valueOf()
moment().month(moment().month()).endOf('month').valueOf()

/* 获取下月 */
moment().month(moment().month() + 1).startOf('month').valueOf()
moment().month(moment().month() + 1).endOf('month').valueOf()

/* 获取本年 */
moment().year(moment().year()).startOf('year').valueOf()
moment().year(moment().year()).endOf('year').valueOf()
```

### 获取下一年时间戳
```js
let time = new Date();
time.setYear(time.getFullYear() + 1);
time.getTime(); // 转时间戳
```
### 将时间转换成时间戳
```js
let time = new Date().getTime();
```