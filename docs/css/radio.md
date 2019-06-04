# 纯CSS实现radio和checkbox实现效果

## reset-radio
实现效果

![](https://i.loli.net/2019/04/02/5ca322047a638.png)

```html
  <!--radio-->
  <div>
    <div class="reset-radio">
      <input checked type="radio" id="age1" name="age">
      <span class="real-target"></span>
    </div>
    <label for="age1">16</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div class="reset-radio">
      <input type="radio" name="age" id="age2">
      <span class="real-target"></span>
    </div>
    <label for="age2">18</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div class="reset-radio">
      <input type="radio" name="age" id="age3">
      <span class="real-target"></span>
    </div>
    <label for="age3">20</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </div>
```
```css
  /*radio*/
  .reset-radio {
      display: inline-block;
      position: relative;
      width: 16px;
      height: 16px;
  }
  
  .reset-radio .real-target {
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      display: inline-block;
      background: #ffffff;
      border: 1px solid #dadde0;
      border-radius: 100%;
      top: 0;
      left: 0;
      bottom: 0;
  }
  
  .reset-radio input[type=radio] {
      cursor: pointer;
      z-index: 2;
      width: 16px;
      height: 16px;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
      right: 0;
      bottom: 0;
  }
  
  .reset-radio input:checked+span {
      border-color: #48b4ec;
  }
  
  .reset-radio input:checked+span::before {
      content: '';
      position: absolute;
      background: #48b4ec;
      width: 6px;
      height: 6px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
  }
```
## reset-checkbox
实现效果

![](https://i.loli.net/2019/04/02/5ca32212e9a4c.png)

```html
   <!--checkbox-->
   <div>
     <div class="reset-checkbox">
       <input checked type="checkbox" id="age1" name="age">
       <span class="real-target"></span>
     </div>
     <label for="age1">16</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <div class="reset-checkbox">
       <input type="checkbox" name="age" id="age2">
       <span class="real-target"></span>
     </div>
     <label for="age2">18</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <div class="reset-checkbox">
       <input type="checkbox" name="age" id="age3">
       <span class="real-target"></span>
     </div>
     <label for="age3">20</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   </div>
```
```css
  /*checkbox*/
  .reset-checkbox {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
  }
  
  .reset-checkbox .real-target {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    display: inline-block;
    background: #ffffff;
    border: 1px solid #d8d8d8;
    top: 0;
    left: 0;
    bottom: 0;
  }
  
  .reset-checkbox input[type=checkbox] {
    cursor: pointer;
    z-index: 2;
    width: 16px;
    height: 16px;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    right: 0;
    bottom: 0;
  }
  
  .reset-checkbox input:checked+span {
    border-color: #48b4ec;
    background: #00b4ed;
  }
  
  .reset-checkbox input:checked+span::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 9px;
    top: 30%;
    left: 50%;
    border: 2px solid;
    border-color: transparent #fff #fff transparent;
    transform: translate(-50%, -50%) rotate(39deg);
  }
```
## css开关按钮
实现效果

![](https://i.loli.net/2019/06/04/5cf62bfc9d0c995873.jpg)

```html
<div class="switch">
  <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox">
  <label for="cmn-toggle-1"></label>
</div>
```
```css
 .cmn-toggle {
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;
  }
  .cmn-toggle + label {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    user-select: none;
  }
  input.cmn-toggle-round + label {
    padding: 2px;
    width: 120px;
    height: 60px;
    background-color: #dddddd;
    border-radius: 60px;
  }
  input.cmn-toggle-round + label:before,
  input.cmn-toggle-round + label:after {
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    bottom: 1px;
    content: "";
  }
  input.cmn-toggle-round + label:before {
    right: 1px;
    background-color: #f1f1f1;
    border-radius: 60px;
    transition: background 0.4s;
  }
  input.cmn-toggle-round + label:after {
    width: 58px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: margin 0.4s;
  }
  input.cmn-toggle-round:checked + label:before {
    background-color: #8ce196;
  }
  input.cmn-toggle-round:checked + label:after {
    margin-left: 60px;
  }
```