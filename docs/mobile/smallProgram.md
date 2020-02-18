# 小程序
## 账号注册
[微信公众平台](https://mp.weixin.qq.com/)

账号：17610835880@163.com

## 应用结构
小程序结构划分：最上层app -> 多个page -> 多个组件

![结构图.png](https://i.loli.net/2020/02/17/qfsR1CZoiBFMDjY.png)

## 配置小程序
### 常见的配置文件有哪些？
1. project.config.json: 项目配置文件，比如项目名称配置、appid等；
  [配置地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)
2. sitemap.json: 小程序搜索相关的；
  [配置地址](https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html)
3. app.json: 全局配置；
4. page.json: 页面配置；

## 全局配置
1. 全局配置文件较多，我们这里将几个比较重要的，完成的查看官方文档
  [配置地址](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

  | 属性   | 类型     | 必填 | 描述               |
  | ------ | -------- | ---- | ------------------ |
  | pages  | string[] | 是   | 页面路径列表       |
  | window | Object   | 否   | 全局的默认窗口表现 |
  | tabBar | Object   | 否   | 底部 tab 栏的表现  |

2. pages: 页面路径列表
   * 用于指定窗口如何展示，其中还包含很多其他的属性
3. tabBar: 底部tab栏的显示
  
## 界面渲染过程
1. 在渲染层，宿主环境会把**WXML**转化成对应的**JS对象**；
2. 将**JS对象**再次转成真是**DOM树**，交由渲染层线程渲染；
3. 数据变化时，逻辑层提供最新的变化数据,JS对象发生变化比较进行diff算法对比；
4. 将最新变化的内容反映到真实的DOM树中，更新UI;



