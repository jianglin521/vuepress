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
