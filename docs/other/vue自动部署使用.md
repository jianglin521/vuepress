# vue自动部署使用

## 结构

1. 开发人员在gitLab上打了一个tag
2. gitLab把tag事件推送到Jenkins
3. Jenkins 获取tag源码，编译，打包，构建镜像
4. Jenkins push 镜像到阿里云仓库
5. Jenkins 执行远程脚本
   5-1. 远程服务器 pull 指定镜像
   5-2. 停止老版本容器，启动新版本容器
6. 通知测试人员部署结果

