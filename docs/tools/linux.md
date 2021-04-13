## linux安装
### 必须分区
一个为根分区，一个为交换分区。

1，/，根分区，一般所有文件都放在根目录下。

2，swap，虚拟内存，交换分区，一般大小为机器内存的1-2倍。

起码有如上两个分区才可以安装linux系统。建议再增加一个/boot分区，200M左右即可。

### 配置
切换用户 `su root`

编辑网卡信息 `vi /etc/sysconfig/network-scripts/ifcfg-ens33`

重启网络服务 `systemctl restart network`

[设置静态ip](https://blog.csdn.net/zhaoyoulin2016/article/details/80441353)

~~设置临时ip `ifconfig ens33 192.168.199.112`~~

### docker-compose常用命令
```sh
docker-compose up -d # 启动（修改docker-compose.yml后需要使用此命令使更改生效）
docker-compose logs # 打印日志；
docker-compose pull # 更新镜像；
docker-compose stop # 停止容器；
docker-compose restart # 重启容器；
docker-compose down # 停止并删除容器；
```

## MySQL5.7
[MySQL5.7安装](https://blog.csdn.net/WYA1993/article/details//88890883)





  
   









