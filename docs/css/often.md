## 点击变色
`:active`元素被点击时变色，但颜色在点击后消失

## 段落缩进
`text-indent:20px;`将段落的第一行缩进

## 添加必填
```css
 div:before {
    content: '*';
    color: red;
 }
```

## 1px方案
### 使用伪类 + transform
```css
  .border_bottom { 
      overflow: hidden; 
      position: relative; 
      border: none!important; 
  }
  .border_bottom:after { 
      content: ".";
      position: absolute; 
      left: 0; 
      bottom: 0; 
      width: 100%; 
      height: 1px; 
      background-color: red; 
      -webkit-transform-origin: 0 0;  
      transform-origin: 0 0; 
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
  }
```

### 使用 box-shadow 模拟
```css
  .border_bottom {
    box-shadow: inset 0px -1px 1px -1px red;
  }
```

## 鼠标悬浮向上移
实现效果：

![视频_2019-12-31_134747.gif](https://i.loli.net/2019/12/31/wDxcXzIVaZKABMJ.gif)

实现代码：
```html
<div class="box">
  <div class="content">
    <div style="height: 300px">
      默认内容
    </div>
    <div style="height: 300px; background: red;">
      悬浮内容
    </div>
  </div>
</div>
```
```css
.box {
  width 200px
  height 200px
  overflow hidden
  position relative
  background: yellow
}
.content {
  width 200px
  height 400px
  text-align center
  transition 0.5s
  position absolute
  z-index 9999
}
.box :hover.content {
  opacity 1
  margin-top -300px
}
```

## 粘性定位 sticky
```html
<div id="app">
  <h1>sticky-demo</h1>
  <nav>我是导航</nav>
  <article>
    <p>我是内容区域</p>
    <p>我是内容区域</p>
  </article>
</div>
```
```css
 body {
    margin: 0px;
    height: 2000px;
  }
  nav {
    width: 100%;
    position: sticky;
    top: 0;
  }
```

## 滚动视差
```html
<div id="app">
  <section class="gImg gImg1">IMG1</section>
  <section class="gImg gImg2">IMG2</section>
  <section class="gImg gImg3">IMG3</section>
</div>
```
```css
 section {
    height: 100vh;
  }
 .gImg {
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    width: 100%;
  }
  .gImg1 {
    background-image: url('./test/01 (1).jpg');
  }
  .gImg2 {
    background-image: url('./test/01 (2).jpg');
  }
  .gImg3 {
    background-image: url('./test/01 (3).jpg');
  }
```
 

