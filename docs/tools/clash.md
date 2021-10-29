

# clash

## 安装clash
```shell
docker run --restart=unless-stopped \
-d --name clash \
-p 7890:7890 -p 9090:9090 \
-v /clash/config.yaml:/root/.config/clash/config.yaml \
dreamacro/clash
```

## clash-ui
```shell
docker run --restart=always \
-d --name clash-ui \
-p 1234:80 \
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
-p 6080:6080 \
moerats/ccaa:latest
```

## 大致信息如下
```text
AriaNg界面：http://ip:6080
访问界面用户名密码分别为：admin、moerats
Aria2密匙：moerats
Filebrowser访问地址：http://ip:6080/admin，也可以通过AriaNg界面上方的文件管理按钮进入
如果我们Web界面进不去，就需要开启防火墙
```

## 安装nextcloud
```shell
docker run --restart=always \
-d --name nextcloud \
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
