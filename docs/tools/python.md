# python
## 数据类型
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200324083829.png)


## pip清华镜像
确保pip版本大于10.0.0，若版本较低先升级版本

升级pip `pip install pip -U`

切换到清华源 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`

## Scrapy框架
[Scrapy介绍](https://www.jianshu.com/p/02cecfad9ef0)

![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200403090433.webp)

## scrapy项目
### 创建项目
1. 创建项目`scrapy startproject [项目名称]`
2. 创建爬虫：进入项目所在的路径,执行`scrapy genspider [爬虫名称]`
3. 运行爬虫：执行`scrapy crawl [爬虫名称]`

### 项目结构
1. item.py 用来存放爬虫爬取下来数据的模型
2. middlewares.py 用来存放各种中间件的文件
3. pipelines.py 用来将items的模型存储到本地磁盘中
4. settings.py 本爬虫的配置信息
5. scrapy.cfg 项目的配置文件
6. spiders包 以后所有的爬虫，都是存放在这里

### CrawlSpider
需要使用`LinkExtractot`和`Rele`这两个东西决定爬虫的具体去向
1. allow设置规则的方法，要能够限制在我们想要的url上，不能跟其他的url产生相同的正则表达式即可
2. 什么情况下使用fllow：如果在爬取页面的时候，需要将满足条件的url再进行跟进，就设置为True,否则设置为False
3. 什么情况下指定callback：如果这个url对应的页面，只是为了获取跟多页面的数据，可以不指定callback





