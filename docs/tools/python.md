# python

## 数据类型

![](http://43.143.190.137:5000/images/2022/04/23/202204231200034.png)


## pip清华镜像
确保pip版本大于10.0.0，若版本较低先升级版本

升级pip `pip install pip -U`

切换到清华源 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`

pip包本地下载 `https://www.lfd.uci.edu/~gohlke/pythonlibs/`

## python转exe
安装pyinstaller `pip install pyinstaller`

打包 `pyinstaller -F ./main.py`

打包动态加载 `pyinstaller -F ./main.py  --hidden-import 【模块名】`

## 查看pip安装的所有包
`pip list`

## 自动拼接url
```py
url = response.urljoin(url)
```
## 获取动态网页
安装  `pip install selenium`

[chromedriver地址](http://chromedriver.storage.googleapis.com/index.html)

## 拼接字符串
### 1、来自C语言的%方式
```py
print('%s %s' % ('Hello', 'world'))
>>> Hello world

# 类似的占位符还有：%d（代表一个整数）、%f（代表一个浮点数）
```
### 2、format()拼接方式
```py
# 简洁版
s1 = 'Hello {}! My name is {}.'.format('World', 'Python猫')
print(s1)
>>>Hello World! My name is Python猫.
 
# 对号入座版
s2 = 'Hello {0}! My name is {1}.'.format('World', 'Python猫')
s3 = 'Hello {name1}! My name is {name2}.'.format(name1='World', name2='Python猫')
print(s2)
>>>Hello World! My name is Python猫.
print(s3)
>>>Hello World! My name is Python猫.
```


## 保存到数据库
```py
import pymysql

class MysqlPipeline(object):
    def __init__(self):
        # 使用pymysql连接上mysql数据库服务器，创建了一个数据库对象；
        self.db = pymysql.connect(
            host='localhost',
            user='root',
            password='123456',
            port=3306,
            db='py_test',
            charset='utf8mb4'
        )

        # 开启mysql的游标功能，创建一个游标对象；              
        self.cursor = self.db.cursor()

    def process_item(self, item, spider):
        sql = 'insert into jianshu(title,h1,num) values(%s,%s,%s)'
        try:
            self.cursor.execute(sql,(item['title'], item['h1'], item['index']))
            self.db.commit()
            print("插入成功")
        except:
            print("插入失败")
            self.db.rollback()

    def close_spider(self, spider):
        self.db.close()
        self.cursor.close()
```

## Scrapy框架
[Scrapy介绍](https://www.jianshu.com/p/02cecfad9ef0)

![](http://43.143.190.137:5000/images/2022/04/23/202204231202024.webp)

## scrapy项目
### 创建项目
1. 创建项目`scrapy startproject [项目名称]`
2. 创建爬虫：进入项目所在的路径,执行`scrapy genspider [爬虫名称] [域名]`
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

### 模拟登陆
1. 想要发送post请求，那么推荐使用`scrapy.FormRequest`,可以方便的指定表单数据
2. 如果想在爬虫一开始的时候就发送post请求，那么应该重写`start_request`方法，在方法中发送post请求

### 内置工具导出文件
```sh
scrapy crawl myspider -o data.json 
scrapy crawl myspider -o data.csv 
scrapy crawl myspider -o data.xml
```

**注意**

导出是中文乱码在settings添加`FEED_EXPORT_ENCODING = 'utf-8'`







