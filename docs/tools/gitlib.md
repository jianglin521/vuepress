# gitlib
## 安装gitlab
[安装教程](https://www.cnblogs.com/dreamrobot/p/9663231.html)
1. 安装依赖软件
```sh
yum -y install policycoreutils openssh-server openssh-clients postfix
```
2. 设置postfix开机自启，并启动，postfix支持gitlab发信功能
```sh
systemctl enable postfix && systemctl start postfix
```
3. 下载gitlab安装包，然后安装
```sh
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-8.0.0-ce.0.el7.x86_64.rpm
rpm -i gitlab-ce-8.0.0-ce.0.el7.x86_64.rpm
```
4. 修改gitlab配置文件指定服务器ip和自定义端口：
```sh
vim /etc/gitlab/gitlab.rb
```
![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20200330111611.png)



