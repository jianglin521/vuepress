#  vue项目自动部署

## docker安装

[docker安装教程](https://yeasy.gitbook.io/docker_practice/install/centos)

### 卸载旧版本

旧版本的 Docker 称为 `docker` 或者 `docker-engine`，使用以下命令卸载旧版本：



```sh
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



```sh
$ sudo yum install -y yum-utils
```

鉴于国内网络问题，强烈建议使用国内源，官方源请在注释中查看。

执行下面的命令添加 `yum` 软件源：



```sh
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

## jenkins安装

[jenkins安装教程](https://www.cnblogs.com/fuzongle/p/12834080.html)

1.启动docker，下载Jenkins镜像文件

```
docker pull jenkins/jenkins
```

 2.创建Jenkins挂载目录并授权权限

```
mkdir -p /var/jenkins_mount
chmod 777 /var/jenkins_mount
```

3.创建并启动Jenkins容器

　　**-d 后台运行镜像**

　　**-p 10240:8080 将镜像的8080端口映射到服务器的10240端口。**

　　**-p 10241:50000 将镜像的50000端口映射到服务器的10241端口**

　　**-v /var/jenkins_\**mount\**:/var/jenkins_mount /var/jenkins_home目录为容器jenkins工作目录，我们将硬盘上的一个目录挂载到这个位置，方便后续更新镜像后继续使用原来的工作目录。这里我们设置的就是上面我们创建的 /var/jenkins_mount目录**

　　**-v /etc/localtime:/etc/localtime让容器使用和服务器同样的时间设置。**

　　**--name myjenkins 给容器起一个别名**

```sh
docker run -d -p 8001:8080 -p 50000:50000 -v /var/jenkins_mount:/var/jenkins_home -v /etc/localtime:/etc/localtime --name myjenkins jenkins/jenkins
```

 4.查看jenkins是否启动成功，如下图出现端口号，就为启动成功了

```
docker ps -l
```

 5.查看docker容器日志

```
docker logs myjenkins
```

 6.配置镜像加速，进入 cd /var/jenkins_mount/ 目录。

```
cd /var/jenkins_mount/
```

