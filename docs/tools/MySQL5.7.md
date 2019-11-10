# Centos7 安装和配置MySQL5.7
## 下载mysql安装源
```sh
[root@localhost data]# wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```
**注意**：如果提示wget命令不存在，先执行
```sh
yum -y install wget
```
多了一个mysql57-xxx的文件，这个就是mysql安装源

## 安装mysql安装源
```sh
[root@localhost data]# yum -y localinstall mysql57-community-release-el7-11.noarch.rpm 
```
## 在线安装MySQL
```sh
[root@localhost data]# yum -y install mysql-community-server 
```
## 启动MySQL服务
```sh
[root@localhost data]# systemctl start mysqld
```
## 设置开机启动
```sh
[root@localhost data]# systemctl enable mysqld
[root@localhost data]# systemctl daemon-reload
```
## 修改root登录密码
mysql安装完成之后，会在/var/log/mysqld.log文件中给root生成了一个临时的默认密码。
```sh
[root@localhost data]# vim /var/log/mysqld.log
```






