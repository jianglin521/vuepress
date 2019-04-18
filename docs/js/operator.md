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
**获取下一年时间戳**
```js
	let time = new Date();
	time.setYear(time.getFullYear() + 1);
	time.getTime();
```