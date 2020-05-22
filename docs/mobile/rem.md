## rem适配
### 方法一
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<script type="text/javascript">
    //rem适配
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
      if (!doc.addEventListener) return;
      recalc();
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  </script>
```

### 方法二
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<script type="text/javascript">
    var handleLoaded = function () {
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (clientWidth >= 640) {
          clientWidth = 640;
        }
        var fontSize = 20 / 375 * clientWidth;
        document.documentElement.style.fontSize = fontSize + "px";
     }
    handleLoaded();
    window.addEventListener("resize", handleLoaded);
</script>
```
## vue-cli3.0中适配rem
1. 安装依赖
`npm install px2rem-loader --save-dev`

2. 在 vue.config.js 进行如下配置
```js
  css: {
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      }
    }
  },
```

3. 在 main.js 设置 html 跟字体大小
```js
function initRem() {
  let cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}

window.addEventListener('resize', function() {
  initRem()
})
```


## meta标签
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。

### 1.name="viewport"
meta viewport 标签首先是由苹果公司在其safari浏览器中引入的，目的就是解决移动设备的viewport问题。后来安卓以及各大浏览器厂商也都纷纷效仿，引入对meta viewport的支持，事实也证明这个东西还是非常有用的。
 
### 2.content 属性值 
- width 可视区域的宽度，值可为数字或关键词device-width
- height 同width
- initial-scale 初始的缩放比例,取值1.0则页面按实际尺寸显示，无任何缩放
- minimum-scale 允许用户缩放到的最小比例
- maximum-scale 允许用户缩放到的最大比例
- user-scalable 用户是否可以手动缩放,no 禁止缩放

