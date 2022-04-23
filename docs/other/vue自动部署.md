#  vue自动部署

## docker安装

[docker安装教程](https://yeasy.gitbook.io/docker_practice/install/centos)

### 卸载旧版本

旧版本的 Docker 称为 `docker` 或者 `docker-engine`，使用以下命令卸载旧版本：



```shell
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

### 使用 yum 安装

执行以下命令安装依赖包：



```shell
$ sudo yum install -y yum-utils
```

鉴于国内网络问题，强烈建议使用国内源，官方源请在注释中查看。

执行下面的命令添加 `yum` 软件源：



```shell
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
```

### 安装 Docker

更新 `yum` 软件源缓存，并安装 `docker-ce`。

```
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

### 启动 Docker

```shell
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

##  建立 docker 用户组

默认情况下，`docker` 命令会使用 [Unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) 与 Docker 引擎通讯。而只有 `root` 用户和 `docker` 组的用户才可以访问 Docker 引擎的 Unix socket。出于安全考虑，一般 Linux 系统上不会直接使用 `root` 用户。因此，更好地做法是将需要使用 `docker` 的用户加入 `docker` 用户组。

建立 `docker` 组：

```
$ sudo groupadd docker
```

将当前用户加入 `docker` 组：

```
$ sudo usermod -aG docker $USER
```

退出当前终端并重新登录，进行如下测试。



## jenkins安装

[jenkins安装教程](https://www.cnblogs.com/fuzongle/p/12834080.html)

1.启动docker，下载Jenkins镜像文件

```
docker pull jenkins/jenkins
```

 2.创建Jenkins挂载目录并授权权限

```
mkdir -p /jenkins_home
chmod 777 /jenkins_home
```

3.创建并启动Jenkins容器

　　**-d 后台运行镜像**

　　**-p 10000:8080 将镜像的8080端口映射到服务器的10240端口。**

　　**-p 10001:50000 将镜像的50000端口映射到服务器的10241端口**

　　**-v  /jenkins_home:/var/jenkins_home 目录为容器jenkins工作目录，我们将硬盘上的一个目录挂载到这个位置，方便后续更新镜像后继续使用原来的工作目录。这里我们设置的就是上面我们创建的 /jenkins_home目录**

　　**-v /etc/localtime:/etc/localtime让容器使用和服务器同样的时间设置。**

　　**--name myjenkins 给容器起一个别名**

```shell
docker run --restart always \
  -d --name jenkins \
  -p 6006:8080 \
  -p 50000:50000 \
  -v $PWD/jenkins_home:/var/jenkins_home \
  -v /etc/localtime:/etc/localtime \
  jenkins/jenkins
```

 4.查看jenkins是否启动成功，如下图出现端口号，就为启动成功了

```
docker ps -l
```

 5.查看docker容器日志

```
docker logs myjenkins
```

## jenkins项目配置

**用到的插件**

1. Git Parameter - git参数化构建
2. Publish Over SSH - 连接远程服务器



**项目配置**

1. 执行shell文件

```shell
cd $WORKSPACE
pwd
node -v
npm -v
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install
npm run build
```

2. SSH Publishers配置

```shell
cd ./dockerWeb/jenkins
cp ./config/docker-deploy.sh  docker-deploy.sh
chmod 777 ./docker-deploy.sh
./docker-deploy.sh 6001
```



**示例图片**

![图片2](http://jianglin521.top:5000/images/2022/04/23/202204231150640.png)

![图片2](http://jianglin521.top:5000/images/2022/04/23/202204231158166.png)



## vue项目打包docker

Dockerfile文件

```shell
#FROM node:12-alpine as build-stage
#WORKDIR /build
#RUN npm config set registry https://registry.npm.taobao.org
#COPY package.json /build/package.json
#RUN npm install
#COPY ./ /build
#RUN npm run build
#
FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /build/dist /usr/share/nginx/html
COPY /dist /usr/share/nginx/html
COPY /config/nginx/default.conf /etc/nginx/conf.d/default.conf
LABEL maintainer="zhuangzhuang"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

生成镜像

 ```shell
 sudo docker build -t vue-dome .  #vue-dome是打包镜像名称
 ```

创建实例

```shell
sudo docker run --restart=always \
  -d --name vue-dome1 \
  -e TZ=Asia/Shanghai \
  -v $PWD/config/nginx/default.conf:/etc/nginx/conf.d/default.conf \
  -p 3500:80 \
  vue-dome
```

常用的命令

```shell
sudo docker restart vue-dome1 #重启容器
sudo docker stop [容器id] #停止容器
sudo docker rm [容器id] #删除容器
sudo docker rmi [镜像id] #删除镜像
sudo docker ps -a #查看所有容器
sudo docker images #查看所有镜像
```



## Node.js实现热加载

```shell
npm install -g nodemon 
nodemon index.js
```

