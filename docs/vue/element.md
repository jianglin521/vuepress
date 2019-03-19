# element-ui
## 表单验证跳转
```js
  this.$refs[formName].validate((valid) => {
      if (valid) {
        
      } else {
        setTimeout(()=>{
          var isError= document.getElementsByClassName("is-error");
          isError[0].querySelector('input').focus();
        },1)
        return false;
      }
  }
```


