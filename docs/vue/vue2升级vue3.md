# vue2升级vue3

## 准备

[教程地址](https://gogocode.io/zh/docs/vue/vue2-to-vue3)

```shell
# 全局安装最新的 gogocode-cli
npm install gogocode-cli -g
```

## 迁移源文件

在终端（terminal）中跳转到需要升级的Vue项目路径。如果需要升级src路径下的vue代码，执行如下命令：​

注意：`-s` 后面是原文件的目录/文件名，`-o`后面是输出的目录/文件名，如果两者相同，转换插件会覆盖你的代码，在此操作前请做好备份。

`gogocode -s ./src -t gogocode-plugin-vue -o ./src-out`

转换操作执行完毕后新的Vue3代码会被写入到src-out目录中

## 依赖升级

除了升级源码，我们还需要升级 Vue3 相关依赖，这一点也可以自动完成，在终端（terminal）中跳转到需要升级的Vue项目路径，执行如下命令：

`gogocode -s package.json -t gogocode-plugin-vue -o package.json`

vue-baidu-map-v3
vant

@amap/amap-jsapi-loader
bmap

## deep问题

```css
/* 警告例子 */
/deep/ .main{
    background: #df2929;
}
>>> .main{
    background: #df2929;
}

/* 正确例子 */ 
:deep(.main){
    background: #df2929;
}
```
