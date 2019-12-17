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

## 自定义主题
1. 安装elementui的自定义主题工具
```js
npm i element-theme -g // 安装主题工具
npm i element-theme-chalk -D // 安装chalk主题
```
2. 初始化变量文件
```sh
et -i 文件名称 [可以自定义变量文件，默认为element-variables.scss]
```
![2019-12-11_173253.png](https://i.loli.net/2019/12/11/M5OCnlfLvZRsYdA.png)

1. 修改变量
直接编辑 element-variables.scss 文件，例如修改主题色为自己所需要的颜色（如：red）
```scss
$--color-primary: red !default;
```
4. 编译生成新的主题样式包
```sh
et
```
![2019-12-11_173547.png](https://i.loli.net/2019/12/11/z7oWkPsV6UJvrSH.png)

编译完成之后在项目根目录生成**theme**文件夹

5. 引入主题样式
```js
import ElementUI from 'element-ui'
import '../theme/index.css'
Vue.use(ElementUI)
```
