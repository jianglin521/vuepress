

# clash
## 进入容器操作
```shell
  docker exec -it qinglong bash
```

## nginx
```shell
docker run --restart=always \
-d --name nginx-dome \
-e TZ=Asia/Shanghai \
-v /nginx/default.conf:/etc/nginx/conf.d/default.conf \
-v /nginx/dist:/usr/share/nginx/html \
-p 80:80 \
nginx
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
export http_proxy=http://49.233.115.121:7890
#如果要设置https代理，应该添加如下配置，暂未尝试过#
export https_proxy=http://49.233.115.121:7890
#设置不代理的IP或者网址，如下配置，这些请求不会被代理，不支持模糊匹配
export no_proxy="127.0.0.1, localhost, 49.233.115.121"

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
```

## 大致信息如下
```text
AriaNg界面：http://ip:8030
访问界面用户名密码分别为：admin、moerats
Aria2密匙：moerats
Filebrowser访问地址：http://ip:8030/admin，也可以通过AriaNg界面上方的文件管理按钮进入
如果我们Web界面进不去，就需要开启防火墙
```

## 安装nextcloud
```shell
docker run --restart=always \
-d --name nextcloud \
-v /docker/nextcloud:/var/www/html/data \
-p 8010:80 \
nextcloud
```

## 安装aliyundrive
```shell
docker run -d --name=aliyundrive --restart=unless-stopped -p 8060:8080 \
  -v /docker/aliyundrive/:/etc/aliyundrive-webdav/ \
  -e REFRESH_TOKEN='your refresh token' \
  -e WEBDAV_AUTH_USER=guan \
  -e WEBDAV_AUTH_PASSWORD=gzz925366 \
  messense/aliyundrive-webdav
```

## frps
```shell
docker run -d --restart always \
-d --name frps \
--network host \
-v /docker/frp/frps.ini:/etc/frp/frps.ini \
snowdreamtech/frps
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
-v /docker/qbittorrent/downloads:/downloads  \
--restart unless-stopped  \
superng6/qbittorrent:latest
```

## musicPlayer
```shell
docker run -d \
--name musicPlayer \
-p 8040:264 \
-v /docker/musicPlayer:/var/www/html/cache \
oldiy/music-player-docker
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
