# nvm

## nvm常用命令

[nvm安装地址](https://github.com/coreybutler/nvm-windows/releases)

```shell
nvm install 12.14.1 # 安装
nvm uninstall 12.14.1 # 卸载
nvm use 12.14.1 # 使用
nvm list # 显示已安装的版本（同 nvm list installed）
nvm list installed # 显示已安装的版本
nvm list available # 显示所有可以下载的版本
```

## nvm使用淘宝镜像

settings.txt添加以下文件

```txt
node_mirror: https://registry.npmmirror.com/
npm_mirror: https://registry.npmmirror.com/
```

## nvm安装版本不存在

[教程地址](https://blog.csdn.net/cc_want/article/details/107518121)
[node离线包下载](https://nodejs.org/download/release/)

1. 如果使用nvm install 8.10.0安装老版本可能会提示下面错误：

   Node.js v8.10.0 is not yet released or available.

2. 手动下载nodejs 8.10.0版本，下载完成后将其解压到nvm安装目录，如下图

   ![nvm安装目录](http://43.143.190.137:5000/images/2023/05/17/20230517135314.png)

3. 使用nvm list命令查看

   这个时候已经能够被nvm正常识别，接下来使用 nvm use 8.12.0命令即可
