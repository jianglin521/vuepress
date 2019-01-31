## css加号
实现效果如下：

![](https://i.imgur.com/iuUfu3d.png)

实现代码：
```html
  <div class="add"></div>
```
```css
  .add {
    border: 1px solid;
    width: 100px;
    height: 100px;
    color: #ccc;
    transition: color .25s;
    position: relative;
  }

  .add::before{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    margin-left: -40px;
    margin-top: -5px;
    border-top: 10px solid;
  }

  .add::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 80px;
    margin-left: -5px;
    margin-top: -40px;
    border-left: 10px solid;
  }

```
## 渐变动画背景
实现效果如下：

![](https://i.imgur.com/iTsEOtK.png)

实现代码：
```html
  <body>
    <h1>渐变动画背景</h1>
  </body>
```
```css
   body {
      width: 100%;
      height: 100%;
      color: #fff;
      background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
      background-size: 400% 400%;
      animation: Gradient 15s ease infinite;
    }

    @keyframes Gradient {
      0% {
        background-position: 0% 50%
      }
      50% {
        background-position: 100% 50%
      }
      100% {
        background-position: 0% 50%
      }
    }

    h1 {
      font-family: 'Open Sans';
      font-weight: 300;
      text-align: center;
      position: absolute;
      top: 45%;
      right: 0;
      left: 0;
    }
```
