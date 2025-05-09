
# clash

## 进入容器操作

```shell
  docker exec -it qinglong bash
```

## nginx权限验证

```shell
#安装 `httpd-tools`
yum install -y  httpd-tools 
#生成新的用户名和密码
#password是你的密码 admin是你的帐号
htpasswd -bc /etc/nginx/htpasswd.users admin password
htpasswd -bc /etc/nginx/htpasswd.users root password

#查看用户名
cat /nginx/htpasswd.users 
# admin:$apr1$9c2/hWtI$0CSGPb8xGTxbZ4CLOx2N3.
# root:$apr1$9c2/fsadfasf1213xGTxbZ4fas12311.

#应用到nginx配置上
#添加以下二行代码在server节点上
auth_basic "Restricted Access"; # 验证
auth_basic_user_file /etc/nginx/htpasswd.users;
#也可以关闭
auth_basic off; # 关闭验证
```

## nginx

```shell
docker run --restart=always \
-d --name nginx \
-e TZ=Asia/Shanghai \
-v /nginx/htpasswd.users:/etc/nginx/htpasswd.users \
-v /nginx/default.conf:/etc/nginx/conf.d/default.conf \
-v /nginx:/usr/share/nginx \
-p 80:80 \
nginx
```

```shell
docker run --restart=always \
-d --name much-more-design \
-e TZ=Asia/Shanghai \
-v /docker/much-more-design/htpasswd.users:/etc/nginx/htpasswd.users \
-v /docker/much-more-design/default.conf:/etc/nginx/conf.d/default.conf \
-v /docker/much-more-design:/usr/share/nginx \
-p 8010:80 \
nginx
```

## 查看所有容器ip

```shell
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```

## 安装clash

```shell
docker run --restart=unless-stopped \
-d --name clash \
-p 7890:7890 -p 9090:9090 \
-v /docker/clash/config.yaml:/root/.config/clash/config.yaml \
dreamacro/clash
```

## clash-ui

```shell
docker run --restart=always \
-d --name clash-ui \
-p 9999:80 \
haishanh/yacd
```

## 设置系统代理

```sh
vim /etc/profile
source /etc/profile
echo $http_proxy
```

/etc/profile文件追加内容

```text
#IP为要连接的代理服务器B，端口是要代理的端口，如下的意思该服务器要通过49.233.115.121服务器的端口7890的代理来访问外网
export http_proxy=http://172.16.20.204:7890
#如果要设置https代理，应该添加如下配置，暂未尝试过#
export https_proxy=http://172.16.20.204:7890
#设置不代理的IP或者网址，如下配置，这些请求不会被代理，不支持模糊匹配
export no_proxy="127.0.0.1, localhost, 172.16.20.204"

```

## 安装Aria2+AriaNg+Filebrowser

```shell
#由于我们可以直接在Filebrowser里进行删减文件，所以这里就暂时不把下载目录映射出来了
docker run --restart=always \
-d --name ccaa \
-p 6800:6800 \
-p 8030:6080 \
-v /docker/ccaa/download:/Down \
moerats/ccaa:latest

# AriaNg界面：http://ip:8030
# 访问界面用户名密码分别为：admin、moerats
# Aria2密匙：moerats
# Filebrowser访问地址：http://ip:8030/admin，也可以通过AriaNg界面上方的文件管理按钮进入
# 如果我们Web界面进不去，就需要开启防火墙
```

## 安装filebrowser

```shell
docker run -d \
--name filebrowser \
-p 8010:8080 \
-v /opt/qbittorrent/download:/data  \
-v /opt/filebrowser/config:/config \
hurlenko/filebrowser

# Filebrowser访问地址：http://ip:8010, 初始账号admin,密码admin
```

## qbittorrent

```shell
docker run -d \
--name=qbittorrent  \
-e WEBUIPORT=8080  \
-e PUID=0 \
-e PGID=0 \
-e TZ=Asia/Shanghai \
-p 6881:6881  \
-p 6881:6881/udp  \
-p 8050:8080  \
-v /docker/qbittorrent/config:/config  \
-v /docker/ccaa/download:/downloads \
--restart unless-stopped  \
superng6/qbittorrent:latest
```

## 安装nextcloud

```shell
docker run --restart=always \
-d --name nextcloud \
-v /docker/nextcloud:/var/www/html/data \
-p 8012:80 \
nextcloud
```

## 安装aliyundrive

```shell
docker run -d --name=aliyundrive --restart=unless-stopped -p 8060:8080 \
  -v /docker/aliyundrive/:/etc/aliyundrive-webdav/ \
  -e REFRESH_TOKEN='阿里token' \
  -e WEBDAV_AUTH_USER=guan \
  -e WEBDAV_AUTH_PASSWORD=xxx \
  messense/aliyundrive-webdav
```

## frps

```shell
docker run -d \
  --restart always \
  --name frps \
  --network host \
  -v /docker/frp/frps.ini:/etc/frp/frps.ini \
  snowdreamtech/frps:0.44.0
```

## frpc

```shell
docker run -d \
--restart=unless-stopped \
-v /home/appdev/docker/frp/frpc.ini:/etc/frp/frpc.ini \
--network host \
--name frpc \
snowdreamtech/frpc
```

## cloudMusic

```shell
docker run -d  \
--name cloudMusic \
-p 8040:8080 \
nondanee/unblockneteasemusic
```

## sillygirl

```shell
docker run -d -t \
--name sillygirl \
--hostname sillygirl \
-p 8020:8080 \
-v /docker/sillyGirl:/sillyGirl \
-e ENABLE_GOPROXY=true \
-e ENABLE_GITHUBPROXY=true \
-e ENABLE_APKPROXY=true \
--restart unless-stopped  \
1687219868/sillygirl:2.0
```

## syncthing

```shell
docker run -d \
  --restart=always \
  --name syncthing \
  -p 8020:8384 \
  -p 22001:22000 \
  -v /docker/syncthing:/var/syncthing \
  syncthing/syncthing
#win10客户端工具SyncTrayzor
```

## alist

```shell
docker run -d --restart=always \
  --name=alist \
  -p 8040:5244 \
  -v /docker/alist:/opt/alist/data \
  -v /docker/syncthing/音乐:/opt/alist/音乐 \
  -v /docker/syncthing/文件同步/小组共享:/opt/alist/小组共享 \
  -v /docker/ccaa/download:/opt/alist/download \
  xhofe/alist:latest
```

::: warning 查看密码
 :tada: 查看初始化密码`docker logs alist`
:::

## tao-sync

```shell
# 网盘同步工具
docker run -d \
  --restart=always \
  --name=taoSync \
  -p 8023:8023 \
  -v /docker/taoSync/data:/app/data \
  dr34m/tao-sync:latest
```

## duplicati

```shell
# nas备份工具
docker run -d \
  --name=duplicati \
  -e PUID=0 \
  -e PGID=0 \
  -e TZ=Asia/Shanghai \
  -p 8200:8200 \
  -e SETTINGS_ENCRYPTION_KEY=xxx \
  -e DUPLICATI__WEBSERVICE_PASSWORD=xxx \
  -v /docker/duplicati/config:/config \
  -v /docker/duplicati/backups:/backups \
  -v /share:/source \
  --restart unless-stopped \
  linuxserver/duplicati
```

## navidrome

```shell
docker run -d \
  --name navidrome \
  --restart=unless-stopped \
  -v /docker/syncthing/音乐:/music \
  -v /docker/navidrome/:/data \
  -p 4533:4533 \
  -e ND_LOGLEVEL=info \
  deluan/navidrome:latest
```

## homebox

```shell
# 衣服管理
docker run -d \
  --name homebox \
  --restart unless-stopped \
  -p 7745:7745 \
  -v /docker/homebox/data:/data \
  -e HBOX_LOG_LEVEL=info \
  -e HBOX_DISABLE_TELEMETRY=true \
  ghcr.io/hay-kot/homebox:latest
```

## 安装mysql5.7

```shell
docker run -d --restart=always \
  --name mysql \
  -p 3306:3306 \
  -v /docker/mysql/conf:/etc/mysql/conf.d \
  -v /docker/mysql/logs:/logs \
  -v /docker/mysql/data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=xxxxx \
  -m 500m \
  mysql:5.7
```

## 安装chevereto

```shell
docker run -d --restart=always  \
  --name=chevereto \
  -e TZ=Asia/Shanghai \
  -p 5000:80 \
  -v /docker/chevereto/config:/config \
  -v /docker/chevereto/data:/data \
  -m 150m\
  linuxserver/chevereto
```

```shell
docker exec -it chevereto bash
# https://github.com/keven1024/chevereto-free-multi-language

docker cp <本地文件夹路径> <容器名称或ID>:<容器目标路径>
docker cp /docker/syncthing/文件同步/其它文件/chevereto-free-multi-language-master/ chevereto:/
```

## aliyundrive-subscribe

```shell
# https://github.com/adminpass/aliyundrive-subscribe/releases

docker run -d --restart=always \
  --name=aliyundrive-subscribe \
  -p 8030:8002 \
  -v /docker/aliyundrive-subscribe/conf:/app/conf \
  looby/aliyundrive-subscribe:latest
```

## 夸克订阅

```shell
docker run -d \
  --name quark-auto-save \
  -p 7010:5005 \
  -v /docker/quark-auto-save/config:/app/config \
  --network bridge \
  --restart unless-stopped \
  cp0204/quark-auto-save:latest
```

## doube-itv

```shell
# http://192.168.1.120:5077/Sub?type=m3u
docker run -d \
  --restart unless-stopped \
  --name doube-itv \
  -p 5077:5000 \
  doubebly/doube-itv:latest

docker exec -it doube-itv sh

docker exec -it doube-itv sed -i \
  -e 's/ystenlive/FifastbLive/g' \
  -e 's/bestzb/FifastbLive/g' \
  -e 's/hnbblive/FifastbLive/g' \
  -e 's/wasusyt/FifastbLive/g' \
  /app/a.txt /app/b.txt

docker run -d \
  --restart=always \
  --name=doube-itv-plus \
  -p 5078:5000 \
  -v /docker/doube-itv-plus/doubebly.json:/app/config/doubebly.json \
  doubebly/doube-itv-plus:1.0.3

docker cp doube-itv-plus:/app/config/. /docker/doube-itv-plus/

curl -O https://json.doube.eu.org/doube_itv_plus.sh && bash doube_itv_plus.sh

chmod +x /docker/doube-itv-plus/doube_itv_plus.sh

0 2 * * * /docker/doube-itv-plus/doube_itv_plus.sh >> /docker/doube-itv-plus/doube_itv_plus.log 2>&1
```

## allinone

```shell
# https://imgtool.v1.mk/allinone.html

docker run -d \
  --name allinone \
  --restart always \
  --net=host \
  --privileged=true \
  -p 35455:35455 \
  youshandefeiyang/allinone \
  -tv=true \
  -aesKey=02moe4n95dqumxz68pyvc9l77jg1db0h \
  -userid=xxx \
  -token=xxx


# 监视容器更新，一个小时检查一次
docker run -d \
  --name watchtower \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --cleanup --interval 3600 allinone
```

## cloud189-auto-save

```shell
docker run -d \
  --name cloud189 \
  --restart unless-stopped \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v /docker/cloud189/.env:/home/.env \
  -v /docker/cloud189/data:/home/data \
  -v /docker/cloud189/services:/home/src/services \
  xia1307/cloud189-auto-save:latest
  xia1307/cloud189-auto-save:v2.2.4

  docker exec -it cloud189 sh

  docker cp /docker/cloud189/WeworkService.js cloud189:/home/src/services/message/
  docker cp /docker/cloud189/task.js cloud189:/home/src/services/

  docker exec -it cloud189 cat /home/src/services/message/WeworkService.js
  docker exec -it cloud189 cat /home/src/services/task.js

```

## cloudsaver

```shell
docker run -d \
  --restart unless-stopped  \
  -p 8818:8008 \
  -v /docker/cloudSaver/data:/app/data \
  -v /docker/cloudSaver/config:/app/config \
  --name cloud-saver \
  jiangrui1994/cloudsaver:latest
```

## php-epg

```shell
docker run -d \
  --name php-epg \
  -p 5678:80 \
  --restart always \
  taksss/php-epg:latest
```

## alist-strm

```shell
docker run -d \
  --name alist-strm \
  -p 18080:5000 \
  -v /docker/alist-strm/home:/home \
  -v /docker/alist-strm/config:/config \
  itefuir/alist-strm:latest
```

## lx-music-sync-server

```shell
docker run -d --restart=always \
  --name=lx-music-sync-server \
  -p 23332:9527 \
  -v /docker/lx-music-sync-server/data:/server/data \
  -v /docker/lx-music-sync-server/logs:/server/logs \
  -e LX_USER_user1=2018 \
  wbsu2003/lx-music-sync-server:latest
```

## xiaomusic

```shell
docker run \
  --name=xiaomusic \
  -p 58090:8090 \
  -e XIAOMUSIC_PUBLIC_PORT=58090 \
  -v /share/音乐/:/app/music \
  -v /docker/xiaomusic/conf:/app/conf \
  hanxi/xiaomusic
```

## 微力同步

```shell
docker run -d --name=verysync \
 -p 8886:8886 \
 -v /docker/verysync:/data \
 jonnyan404/verysync
```

## homeassistant

```shel
docker run -d \
  --name homeassistant \
  --network=host \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -v /docker/homeassistant:/config \
  homeassistant/home-assistant
```

::: warning 访问端口
 :tada: 访问端口 8123
:::

## 微信备份

```shell
docker run -d --restart=always \
  --name=cloudbak \
  -p 9527:9527 \
  -v /docker/cloudbak:/app/data \
  likeflyme/cloudbak
```

## 本地搭建chatgpt

```shell
# docker pull pengzhile/pandora-next

# docker run -d \
#   --restart=always \
#   --name=chatgpt \
#   --net=bridge \
#   -p 8899:8181 \
#   -v /docker/pandoraNext/data:/data \
#   -v /docker/pandoraNext/sessions:/root/.cache/PandoraNext \
#   pengzhile/pandora-next

docker run -d \
  --restart=always \
  -p 8899:3000 \
  -e OPENAI_API_KEY=xxx \
  -e CODE=92xx66 \
  --name=chatgpt \
  yidadaa/chatgpt-next-web
```

## music_tag_web

```shell
docker run -d \
  -p 8001:8002 \
  -v /docker/syncthing/音乐:/app/media \
  -v /docker/music_tag_web/config:/app/data \
  --restart=always \
  --name=music_tag_web  \
  xhongc/music_tag_web:2.0.1
```

## xTeVe

```shell
docker run -d \
  --name=xteve  \
  --net=host  \
  --log-opt max-size=10m  \
  --log-opt max-file=3  \
  -e TZ="Asia/Shanghai"  \
  -v /docker/xteve/:/root/.xteve:rw  \
  -v /docker/xteve/_config/:/config:rw  \
  -v /docker/xteve/_guide2go/:/guide2go:rw  \
  alturismo/xteve_guide2go
```

## verdaccio

```shell
# npm私服
docker run -d \
  -p 4873:4873 \
  --name verdaccio \
  -v /docker/verdaccio/conf:/verdaccio/conf  \
  -v /docker/verdaccio/plugins:/verdaccio/plugins  \
  -v /docker/verdaccio/storage:/verdaccio/storage  \
  verdaccio/verdaccio
```

## 小雅

```shell
docker run -d \
 -p 5678:80 \
 -p 2345:2345 \
 -p 2346:2346 \
 -v /docker/xiaoya:/data \
 --restart=always \
 --name=xiaoya \
 xiaoyaliu/alist:latest


 docker run -d \
 -p 5678:80 \
 -v /docker/xiaoya:/data \
 --restart=always \
 --name=xiaoya \
 xiaoyaliu/alist:latest

# 必要文件
# mytoken.txt myopentoken.txt temp_transfer_folder_id.txt

# 定时重启
# 0 6 * * * docker restart xiaoya

# 实时日志
# docker logs -f --since 30m xiaoya


bash -c "$(curl -s http://docker.xiaoya.pro/update_new.sh)"
```

## xiaoya-tvbox

```shell
# 内置小雅
docker run -d \
  -p 4567:4567 \
  -p 5678:80 \
  -e ALIST_PORT=5678 \
  -v /docker/xiaoya-tvbox:/data \
  --restart=always \
  --name=xiaoya-tvbox \
  haroldli/xiaoya-tvbox:latest

# 纯净版
docker run -d \
  -p 4567:4567 \
  -v /docker/alist-tvbox:/data \
  --restart=always \
  --name=alist-tvbox \
  haroldli/alist-tvbox
```

## php-env

```shell
docker run -d  \
  --restart unless-stopped \
  --privileged=true \
  --name php-env \
  -p 5611:80 \
  -v /docker/php-env:/var/www/html \
  youshandefeiyang/php-env
```

## xiaoyakeeper

```shell
# 模式3：创建一个名为 xiaoyakeeper 的docker定时运行小雅转存清理并升级小雅镜像
bash -c "$(curl -s https://xiaoyahelper.zngle.cf/aliyun_clear.sh | tail -n +2)" -s 3 -tg
```

## emby安装

[教程地址](https://xiaoyaliu.notion.site/d353c9ceb15444d7b8e21ce6097ed739?v=145044ac8252470a9feef094ff1db520)

```shell

bash -c "$(curl http://docker.xiaoya.pro/emby.sh)" -s /docker/emby /docker/xiaoya

bash -c "$(curl http://docker.xiaoya.pro/resilio.sh)" -s /docker/emby /docker/xiaoya

# 如果自行下载元数据包，只需要解压和安装emby，那么执行
# bash -c "$(curl http://docker.xiaoya.pro/emby_plus.unzip.sh)" -s /docker/emby /docker/xiaoya
```

## docker-compose

```shell
#拉取镜像
docker-compose pull
#创建容器运行
docker-compose up -d
#停止应用程序
docker-compose down
#查看应用程序日志
docker-compose logs
#重启应用程序
docker-compose restart
#查看运行中的容器
docker-compose ps
```

## 常用命令

```shell
# 进入容器
docker exec -it quark-auto-save bash

# 查看磁盘占用
df -h

# 查看文件夹大小
du -sh ./* | sort -n
du -h /backup/*

# 解压文件夹
tar -zcvf ./docker_back.tar.gz ./docker

# 查看容器占用内存
docker stats

# 文件移动
mv download/*  /docker/syncthing/文件同步/其它文件/
```

## rclone使用

[教程地址](https://blog.csdn.net/qq_35385687/article/details/128845882
)
