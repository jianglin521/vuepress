## linux安装

### 必须分区

一个为根分区，一个为交换分区。

1，/，根分区，一般所有文件都放在根目录下。

2，swap，虚拟内存，交换分区，一般大小为机器内存的1-2倍。

起码有如上两个分区才可以安装linux系统。建议再增加一个/boot分区，200M左右即可。

### 配置

[设置静态ip](https://blog.csdn.net/zhaoyoulin2016/article/details/80441353)

切换用户 `su root`

编辑网卡信息 `vi /etc/sysconfig/network-scripts/ifcfg-ens33`

重启网络服务 `systemctl restart network`

~~设置临时ip `ifconfig ens33 192.168.199.112`~~

查看网关   `netstat -rn`

### 添加定时任务

```shell
crontab -e
10 18  * * 1-5 /bin/sh /home/projects/JD-Script/run.sh OpenCard  > /home/projects/log/log1.txt 2>&1 &
0 20 * * *  cd /home/projects/QuantumultX && git pull > /home/projects/log/log2.txt 2>&1 &
30 0 * * *  bash /docker/backup/backup.sh > /home/projects/log/log3.txt 2>&1 &
30 1 * * * cd /home/projects/vuepress && npm run deploy2 > /home/projects/log/log4.txt 2>&1 &
```

### linux端口占用

```
netstat -ntlp   // 查看当前所有tcp端口
netstat -ntulp | grep 80   // 查看所有80端口使用情况
netstat -ntulp | grep 3306   // 查看所有3306端口使用情
netstat -tulpn | grep <端口号>
```

### 解压缩文件

```shell
# tar 压缩文件夹
tar -zcvf ./ql_back.tar.gz ./ql_back
tar -zcvf ./elecv2p_back.tar.gz ./elecv2p_back
tar -zcvf ./navidrome.tar.gz ./navidrome

# tar -zcvf 打包后生成的文件名全路径 要打包的目录 
# 例子：把./ql文件夹打包后生成一个./ql_back.tar.gz的文件
# 忽略某个目录
tar -zcvf docker2.tar.gz --exclude=docker/syncthing/文件同步 --exclude=docker/syncthing/我的文件 /docker
tar -zcvf nginx2.tar.gz /nginx
tar -zcvf home2.tar.gz /home

# tar 解压文件夹
tar -zxvf ./ql_back.tar.gz -C ./
tar -zcvf ./elecv2p_back.tar.gz -C ./

#把根目录下的ql_back.tar.gz解压到./下
#这个和cp命令有点不同，cp命令如果不存在这个目录就会自动创建这个目录
#例子：把./ql_back.tar.gz文件解压到./文件夹-解压带ql_back目录

# 移动文件
# -f: 如果指定移动的源目录或文件与目标的目录或文件同名，不会询问，直接覆盖旧文件
mv source_file(文件) dest_directory(目录)

mv /nginx.tar.gz ./
```

### docker-compose常用命令

```shell
docker-compose up -d # 启动（修改docker-compose.yml后需要使用此命令使更改生效）
docker-compose logs # 打印日志；
docker-compose pull # 更新镜像；
docker-compose stop # 停止容器；
docker-compose restart # 重启容器；
docker-compose down # 停止并删除容器；
```

### 进入容器

```shell
docker exec -it qinglong bash
```

## 查看端占用、关闭进程

```shell
netstat -ntlp   #查看当前所有tcp端口
netstat -ntulp | grep 80   #查看所有80端口使用情况
netstat -ntulp | grep 3306   #查看所有3306端口使用情况
```

```shell
kill -9 1000 #关闭PID为1000的进程
```

## MySQL5.7

[MySQL5.7安装](https://blog.csdn.net/WYA1993/article/details//88890883)

## java相关

```shell
tail -f nohup.out  # 查看java日志
jps # 查看java进程
```
