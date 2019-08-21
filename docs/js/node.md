# node使用
## 安装node
- 访问 https://nodejs.org/en/
- 选择Download按钮下载LTS版本的Nodejs，推荐大多数用户去下载这个版本。
- 检测node安装是否成功`>node -v`

## 创建node服务
```js
  //Load HTTP module
  var http = require("http");
  
  //Create HTTP server and listen on port 8000 for requests
  http.createServer(function (request, response) {
  
     // Set the response HTTP header with HTTP status and Content type
     response.writeHead(200, {'Content-Type': 'text/plain'});
     
     // Send the response body "Hello World"
     response.end('Hello World\n');
  }).listen(8000);
  
  // Print URL for accessing server
  console.log('Server running at http://127.0.0.1:8000/')
```
在命令行工具中进入hellonode.js文件的目录，使用node +文件名的方式运行该脚本文件

`>node hellonode.js`

`Server running at http://127.0.0.1:8000/`

## 创建express服务
`npm init`

`npm install express`

创建服务
```js
  var express = require('express')
  var app = express()
  
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  
  app.listen(8000, function () {
    console.log('Server running at http://127.0.0.1:8000/')
  })
```
`>node index.js`

`Server running at http://127.0.0.1:8000/`

## 创建json服务
安装 `npm i -g json-server`

运行 `json-server --watch db.jsons`

## exports 与 module.exports 区别
在一个 node 执行一个文件时，会给这个文件内生成一个 exports 和 module 对象， 而module又有一个 exports 属性。他们之间的关系如下图，都指向一块{}内存区域。
```js
  exports = module.exports = {}
  // 上面的代码等价于:
  module.exports = {}
  exports = module.exports
```
看一张图理解这里更清楚：

![](https://i.loli.net/2019/08/20/DJTfjXrWAGRhp91.png)

原理很简单，即 module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。


















