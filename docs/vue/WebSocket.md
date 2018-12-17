## WebSocket使用
```js
  var ws = new WebSocket("ws://localhost:9999/Test");
  ws.onopen = function(){ws.send("Test!");};
  ws.onmessage = function(evt){console.log(evt.data);ws.close();};
  ws.onclose = function(evt){console.log("WebSocketClosed!");};
  ws.onerror = function(evt){console.log("WebSocketError!");};
```


  