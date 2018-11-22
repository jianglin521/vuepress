# css实现单行、多行文本超出显示省略号

## 单行文本超出...
![](https://i.imgur.com/MoY890M.png)
```css
  .ellipsis-line {
      border: 1px solid #f70505;
      padding: 8px;
      width: 400px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap; //文本不会换行
  }
  
```
语法：
text-overflow:clip/ellipsis;
默认值：clip
适用于：所有元素
clip： 当对象内文本溢出时不显示省略标记（...），而是将溢出的部分裁切掉。 
ellipsis： 当对象内文本溢出时显示省略标记（...）。

在使用的时候，有时候发现不会出现省略标记效果，经过测试发现，使用ellipsis的时候，必须配合overflow:hidden; white-space:nowrap; width:具体值;这三个样式共同使用才会有效果。

## 多行文本超出...
![](https://i.imgur.com/fpL29ot.png)
```css
  .multi-line {
      border: 1px solid #f70505;
      width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
  }
```
在WebKit浏览器或移动端（绝大部分是WebKit内核的浏览器）的页面实现比较简单，可以直接使用WebKit的CSS扩展属性(WebKit是私有属性)-webkit-line-clamp ；注意：这是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：

display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。

-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

text-overflow: ellipsis;，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。

这个属性只合适WebKit浏览器或移动端（绝大部分是WebKit内核的）浏览器

## 多行显示在`<a>`中问题
现象是省略号不在文章末尾显示，而是在文章中间，就是文章开头提到的错误现象。这种现象出现在移动端，PC端测试了下，可以正常显示。可能跟浏览器内核有关。

解决办法：将需要省略号的文本不直接用a标签包裹。或是在a标签内再嵌套一层。
```html
  <a href="">
    <span>我是多行文本我是多行文本我是多行文本我是多行文本</span>
  </a>
```