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
        link: '/work/task'
      },
      {
        text: 'Vue',
        link: '/vue/vue'
      },
      {
        text: 'js',
        link: '/js/es6'
      },
      {
        text: 'css',
        link: '/css/often'
      },
      {
        text: '移动端',
        link: '/mobile/rem'
      },
      {
        text: '工具',
        link: '/tools/nginx'
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
        ['task','计划'],
        ['account','账号'],
        ['other','其它'],
      ],
      '/vue/': [
        ['vue','vue项目搭建'],
        ['communication','vue组件通信'],
        ['vuex','vuex使用'],
        ['WebSocket','WebSocket'],
      ],
      '/js/': [
        ['es6','es6使用手册'],
        ['array','数组常用方法'],
        ['regex','正则表达式'],
        ['operator','js运算符'],
        ['node','node使用'],
        ['npm','npm使用'],
      ],
      '/css/': [
        ['often','常用样式'],
        ['listLayout','列表布局'],
        ['add','css加号'],
        ['ellipsis','文本省略号'],
        ['radio','radio和checkbox'],
        ['bottomFixing','css实现底部固定'],
      ],
      '/mobile/': [
        ['rem','rem适配'],
        ['reset','去除默认样式'],
      ],
      '/tools/': [
        ['nginx','nginx开机自启'],
      ],
    },
    sidebarDepth: 1 //标题深度
  }
}
