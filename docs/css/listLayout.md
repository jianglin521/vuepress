# CSS列表项布局
## 元素宽度已知
**元素宽度已知，即知道每行最多多少个，且所有元素都在一个容器中**

**思路**：item 在一个容器中，每第三个去掉 margin-right，最后三个取消 margin-bottom（如最后一行不满 3 个也不影响）

**关键代码**
```html
  <div class='container'>
    <div class='item'>宽度已知，最多放三个</div>
    <div class='item'>宽度已知，最多放三个</div>
    <div class='item'>宽度已知，最多放三个</div>
  </div>
  
  <style>
  /* scss code */
  .container {
    .item {
      margin-right: 30px;
      margin-bottom: 20px;
  
      &:nth-child(3n) { margin-right: 0; }
      &:nth-last-child(-n+3) { margin-bottom: 0; }
    }
  }
  </style>
```
**实现效果**
![](https://i.loli.net/2019/04/02/5ca32135bb60b.png)

## 元素宽度已知或未知
**元素宽度已知或未知，且元素按照行数在相应容器中**

**思路**：最后一个 container 去掉 margin-bottom，最后一个 item 去掉 magin-right

**关键代码**
```html
  <div class='container'>
    <div class='item'></div>
    <div class='item'></div>
  </div>
  <div class='container'>
    <div class='item'></div>
    <div class='item'></div>
    <div class='item'></div>
  </div>
  <div class='container'>
    <div class='item'></div>
  </div>
  
  <style>
  /* scss code */
  .container {
    margin-bottom: 20px;
    &:last-child { margin-bottom: 0; }
  
    .item {
      margin-right: 30px;
      &:last-child { margin-right: 0; }
    }
  }
  </style>
```
实现效果
![](https://i.loli.net/2019/04/02/5ca321468e2c2.png)

