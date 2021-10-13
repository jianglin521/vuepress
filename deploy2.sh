#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 获取最新代码
git pull

# 生成静态文件
npm run build

# 进入生成的文件夹
rm -rf /nginx/dist
cp -r docs/.vuepress/dist /nginx
