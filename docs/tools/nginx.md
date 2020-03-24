## 1、创建批处理文件nginx.bat
```
  cd /d D:\nginx\nginx-1.14.0
  start nginx
  nginx -s reload
```

## 2、创建任务计划

### 2.1创建基本任务
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200324145833.png)

### 2.2设置触发器为“计算机启动时”
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200324150054.png)

### 2.3选择操作为“启动程序”，在程序或脚本栏目输入刚刚建立的批处理文件的路径；点击“下一步”，然后点击“完成”；

### 2.4最重要的一步，修改任务的属性。必须设置任务的“不管用户是否登录都要运行”，才会让系统在重启后立即启动任务。
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200324150220.png)

创建好的任务
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200324150236.png)



## 3、重启操作系统进行测试
到此，任务就已经创建好了，可以重启操作系统试一下`Nginx`服务是否自启动了。