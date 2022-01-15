/*Created by guan on 2018/10/29*/
const navConf = require('../../config/navConf.js');
const sidebarConf = require('../../config/sidebarConf.js');

module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN', 
    }
  },
  // 左上角标题
  title: '个人的文档库',
  // 描述
  description: '前端工程师 降临 的文档库',
  // 头部部署，右上角小图标
  head: [
    // ico 配置
    ['link', {
      rel: 'icon',
      href: '/img/logo.ico'
    }]
  ],
  // 主题部署
  themeConfig: {
    lastUpdated: '上次更新',
    /* 右侧导航条 */
    nav: navConf,
    /* 侧边栏配置：侧边栏组 */
    sidebar: sidebarConf,
    sidebarDepth: 1 //标题深度
  }
}
