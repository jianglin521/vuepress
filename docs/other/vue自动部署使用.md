# vue-docker部署使用

## 使用步骤

1. 将本地`config`目录、`dist`目录、`Dockerfile`上传的指定目录

2. 执行打包镜像

   ```shell
   sudo docker build -t vue-dome .    #vue-dome是打包镜像名称，这里可以自己定义自己的
   ```

3. 创建新的容器并启动

   ```shell
   sudo docker run --restart=always \
     -d --name vue-dome1 \
     -e TZ=Asia/Shanghai \
     -v $PWD/config/nginx/default.conf:/etc/nginx/conf.d/default.conf \
     -p 3500:80 \
     vue-dome
     #vue-dome1是容器名称，这里可以自己定义，不能重复
     #3500是向外暴露的端口号，这里可以自己定义，不能重复
     #以后前端的小伙伴都可以拥有自己的页面了，不会相互影响
     #57统一放在了/home/appdev/docker/vue-dome目录
   ```

4. 常用的命令

   ```shell
   sudo docker restart vue-dome1 #重启容器
   sudo docker stop [容器id] #停止容器
   sudo docker rm [容器id] #删除容器
   sudo docker rmi [镜像id] #删除镜像
   sudo docker ps -a #查看所有容器
   sudo docker images #查看所有镜像
   ```

   

