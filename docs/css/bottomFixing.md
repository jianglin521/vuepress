# css实现底部固定
## 方法一：footer高度固定+绝对定位
```html
  <div class="dui-container">
    <header>Header</header>
    <main>Content</main>
    <footer>Footer</footer>
  </div>
```
```css
  html,body{
    height:100%;
    margin:0;
  }
  .dui-container{
    position: relative;
    min-height: 100%;
    background: yellow;
  }
  main {
    padding-bottom: 100px;
  }
  header, footer{
    line-height: 100px;
    height: 100px;
    background: red;
  }
  footer{
    width: 100%;
    position: absolute;
    bottom: 0
  }
```

## 方法二：在主体content上的下边距增加一个负值等于底部高度
```html
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
```
```css
  html,body{
    height:100%;
    margin:0;
  }
  main {
    min-height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    margin-top: -100px;
    margin-bottom: -100px;
    box-sizing: border-box;
  }
  header, footer{
    line-height: 100px;
    height: 100px;
    background: yellow;
  }
```
## 方法三：将页脚的margin-top设为负数
```html
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
```
```css
  html,body{
    height:100%;
    margin:0;
  }
  main {
    min-height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    box-sizing: border-box;
  }
  header, footer{
    line-height: 100px;
    height: 100px;
    background: yellow;
  }
  header{
    margin-bottom: -100px;
  }
  footer{
    margin-top: -100px;
  }
```
