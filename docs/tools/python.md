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

### Scrapy Engine
引擎负责控制数据流在系统中所有组件中流动，并在相应动作发生时触发事件。 详细内容查看下面的数据流 (Data Flow) 部分。

此组件相当于爬虫的 “大脑”，是整个爬虫的调度中心。

### 调度器 (Scheduler)
调度器从引擎接受 request 并将他们入队，以便之后引擎请求他们时提供给引擎。

初始的爬取 URL 和后续在页面中获取的待爬取的 URL 将放入调度器中，等待爬取。同时调度器会自动去除重复的 URL（如果特定的 URL 不需要去重也可以通过设置实现，如 post 请求的 URL）

### 下载器 (Downloader)
下载器负责获取页面数据并提供给引擎，而后提供给 spider。

### Spiders
Spider 是 Scrapy 用户编写用于分析 response 并提取 item (即获取到的 item) 或额外跟进的 URL 的类。 每个 spider 负责处理一个特定 (或一些) 网站。

### Item Pipeline
Item Pipeline 负责处理被 spider 提取出来的 item。典型的处理有清理、 验证及持久化 (例如存取到数据库中)。

当页面被爬虫解析所需的数据存入 Item 后，将被发送到项目管道 (Pipeline)，并经过几个特定的次序处理数据，最后存入本地文件或存入数据库。

### 下载器中间件 (Downloader middlewares)
下载器中间件是在引擎及下载器之间的特定钩子 (specific hook)，处理 Downloader 传递给引擎的 response。 其提供了一个简便的机制，通过插入自定义代码来扩展 Scrapy 功能。

通过设置下载器中间件可以实现爬虫自动更换 user-agent、IP 等功能。

### Spider 中间件 (Spider middlewares)
Spider 中间件是在引擎及 Spider 之间的特定钩子 (specific hook)，处理 spider 的输入 (response) 和输出 (items 及 requests)。 其提供了一个简便的机制，通过插入自定义代码来扩展 Scrapy 功能。

### 数据流 (Data flow)
1. 引擎打开一个网站 (open a domain)，找到处理该网站的 Spider 并向该 spider 请求第一个要爬取的 URL (s)。
2. 引擎从 Spider 中获取到第一个要爬取的 URL 并在调度器 (Scheduler) 以 Request 调度。
3. 引擎向调度器请求下一个要爬取的 URL。
4. 调度器返回下一个要爬取的 URL 给引擎，引擎将 URL 通过下载中间件 (请求 (request) 方向) 转发给下载(Downloader)。
5. 一旦页面下载完毕，下载器生成一个该页面的 Response，并将其通过下载中间件 (返回 (response) 方向) 发送给引擎。
6. 引擎从下载器中接收到 Response 并通过 Spider 中间件 (输入方向) 发送给 Spider 处理。
7. Spider 处理 Response 并返回爬取到的 Item 及 (跟进的) 新的 Request 给引擎。
8. 引擎将 (Spider 返回的) 爬取到的 Item 给 Item Pipeline，将 (Spider 返回的) Request 给调度器。
9. (从第二步) 重复直到调度器中没有更多地 request，引擎关闭该网站。





