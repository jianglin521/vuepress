## css加号
实现效果如下：

![](https://i.loli.net/2019/04/02/5ca31f5189b73.png)

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

![](https://i.loli.net/2019/04/02/5ca31f7541747.png)

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

## 实现掘金登录页面
实现效果：

![](https://i.loli.net/2019/04/02/5ca31fa6effad.png)

实现代码：

```html
 <div class="g-wrap"></div>
  <div class="g-container">
    <h2>登录</h2>
    <div class="g-username">
      <input name="loginPhoneOrEmail" maxlength="64" placeholder="请输入手机号或邮箱" class="input">
      <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="g-username">
    </div>

    <div class="g-password">
      <input name="loginPassword" type="password" maxlength="64" placeholder="请输入密码" class="input">
      <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="g-password">
    </div>

    <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="g-normal">
  </div>
```
```css
  .g-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.3);
  }

  .g-container {
    position: relative;
    width: 318px;
    margin: 100px auto;
    height: 370px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    input {
      outline: none;
      padding: 10px;
      width: 100%;
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      outline: none;
      box-sizing: border-box;
      font-size: 16px;
    }
  }

  img {
    position: absolute;
    top: -20%;
    left: 50%;
    width: 120px;
    height: 95px;
    transform: translate(-50%, 0);
  }

  .g-username {
    margin-bottom: 10px;
    img {
      display: none;
      width: 120px;
      height: 113px;
    }
  }

  .g-username:focus-within ~ img {
    display: none;
  }

  .g-username:focus-within {
    input {
      border-color: #007fff;
    }
    img {
      display: block;
    }
  }

  .g-password {
    margin-bottom: 10px;
    img {
      display: none;
      width: 103px;
      height: 84px;
      top: -15%;
    }
  }

  .g-password:focus-within ~ img {
    display: none;
  }

  .g-password:focus-within {
    input {
      border-color: #007fff;
    }
    img {
      display: block;
    }
  }

```

## css实现表单验证

**定义和使用**`:invalid` 选择器用于在表单元素中的值是非法时设置指定样式。

**注意**： `:invalid` 选择器只作用于能指定区间值的元素，例如 input 元素中的 min 和 max 属性，及正确的 email 字段, 合法的数字字段等。

实现效果:

![](https://i.loli.net/2019/04/02/5ca31fd284869.png)

实现代码：

```html
  <form class="form" id="form" method="get" action="/api/form">
      账号：
      <input data-title="账号" pattern="[\w]{6,10}" name="account" type="text" required />
      <span class="f-tips">请输入正确的账号</span>
      <br />
      密码：
      <input data-title="密码" pattern="[\w]{6,10}" name="password" type="password" required />
      <span class="f-tips">请输入正确的密码</span>
      <br />
      <input name="button" type="submit" value="提交" />
  </form>
```
```css
  :root {
    --error-color: red;
  }
  .form > input {
    margin-bottom: 10px;
  }
  .form > .f-tips {
    display: none;
  }
  input[type="text"]:invalid ~ input[type="submit"],
  input[type="password"]:invalid ~ input[type="submit"] {
    display: none;
  }
  input[required]:invalid + span {
    display: inline;
    color: var(--error-color);
  }
```