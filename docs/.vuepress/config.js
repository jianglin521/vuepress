/*Created by guan on 2018/10/29*/
module.exports = {
  // 左上角标题
  title: '降临的文档库',
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
    /**
     * 右侧导航条
     * text - 显示字段
     * link - 链接：注意前后带 / 符号
     */
    nav: [
      {
        text: '工作',
        link: '/work/account'
      },
      {
        text: 'Vue',
        link: '/vue/test'
      },
      /*{
        text: '博文',
        items: [
          {
            text: 'VuePress',
            link: 'https://github.com'
          }
        ]
      },*/
      // 链接到网站
      {
        text: 'Github',
        link: 'https://github.com/jianglin521'
      },
    ],
    /**
     * 侧边栏配置：侧边栏组
     */
    sidebar: {
      // 侧边栏在 /index/ 目录上
      '/work/': [
        ['account','账号'],
        ['other','其它'],
      ],
      '/vue/': [
        ['test','测试'],
      ],
    },
    sidebarDepth: 1 //标题深度
  }
}
