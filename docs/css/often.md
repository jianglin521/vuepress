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
 

