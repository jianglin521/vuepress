## 按钮
实现效果如下：

![视频_2019-12-27_111052.gif](https://i.loli.net/2019/12/27/PDrhMZmA6JxLbpf.gif)

实现代码：
```html
<button class="btn-1">按钮一</button>
<button class="btn-2">按钮二</button>
<button class="btn-3">按钮三</button>
<button class="btn-4">按钮四</button>
<button class="btn-5">按钮五</button>
<button class="btn-6">按钮六</button>
<button class="btn-7">按钮七</button>

<style>
  button{
    position: relative;
    width: 100px;
    height: 40px;
    border: 1px solid #46b0ff;
    background: none;
    cursor: pointer;
  }
  button:after{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .btn-1:after{
    opacity: 0;
    background: #46b0ff;
    transition: all 2s;
    z-index: -1;
  }
  .btn-1:hover:after{
    opacity: 1;
  }
  /* 这里省略上方的公共样式 */
  .btn-2:after{
    width: 0
    background: #f13f84;
    transition: all .3s;
    z-index: -1;
  }
  .btn-2:hover:after{
    width 100%
  }
  .btn-3:after{
    height: 0
    background: #f13f84;
    transition: all .3s;
    z-index: -1;
  }
  .btn-3:hover:after{
    height 100%
  }
  .btn-4:after{
    height: 0;
    background: #00b7a3;
    transition: all .3s;
    z-index: -1;
    bottom: 0;
    top: initial
  }
  .btn-4:hover:after{
    height: 100%;
  }
  .btn-5:after{
    width: 0;
    background: #00b7a3;
    transition: all .3s;
    z-index: -1;
    right: 0;
    left: initial
  }
  .btn-5:hover:after{
    width: 100%;
  }
  .btn-6:after{
    width: 0;
    background: #ff9900;
    transition: all .3s;
    z-index: -1;
    left: 50%;
    transform: translateX(-50%);
  }
  .btn-6:hover:after{
    width: 100%;
  }
  .btn-7:after{
    height: 0;
    background: #00b7a3;
    transition: all .3s;
    z-index: -1;
    top: 50%;
    transform: translateY(-50%);
  }
  .btn-7:hover:after{
    height: 100%;
  }
</style>
```