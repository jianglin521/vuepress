#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 获取最新代码
git pull
echo "------代码拉取完成-------"

# 生成静态文件
npm run build
echo "--------构建完成--------"

# 进入生成的文件夹
rm -rf /nginx/dist
cp -r docs/.vuepress/dist /nginx
echo "-------复制文件完成---------"

# 重启容器
docker restart nginx-dome
docker ps
echo "-------部署完成---------"
echo "-------访问地址: http://jiagnlin521.top ---------"


