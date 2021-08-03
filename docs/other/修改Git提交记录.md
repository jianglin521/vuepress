# 修改Git提交记录

![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20210803151118.png)

最近Github的服务不太稳定，感觉要凉的节奏？

这两天好不容易有空提交一下开源代码了，结果在公司提交的代码有记录，但是没有绿色，延迟？真的要凉

检查后发现原因是 git 本地设置的全局邮箱和用户名跟 github 网站的不一致

单独配置项目的邮箱和用户名却是可以显示绿色的

我在公司配置的是公司的邮箱，没有配置我自己的邮箱

写个脚本文件来处理一下吧

此方法也适用于当我们换邮箱了，想把已经提交过的 commit 的邮箱和用户名改成新的时候

先来看一下开始的提交记录

![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20210803151211.png)

先来把邮箱和名称配置一下

```javascript
git config user.name 'jianglin'
git config user.email 'xxx@163.com'
```

这时候就可以用下面的脚本代码了

在项目根目录下创建 `name.sh` 写入下面这段代码

```shell
#!/bin/sh

git filter-branch --env-filter '

OLD_NAME="jianglin"
CORRECT_NAME="zhuang"
CORRECT_EMAIL="XXX@163.com"

if [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

把`OLD_EMAIL`、`CORRECT_NAME`、`CORRECT_EMAIL`改成自己的新旧邮箱用户名即可

然后我们来执行一下这个`.sh`文件

```shell
./name.sh
```

如果`commit`记录比较多的话执行的时间会比较长

![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20210803151234.png)

再查看`git log`可以看到已经修改成功

![](https://gitee.com/jianglin521/picgoImg/raw/master/img/20210803151302.png)

如果执行失败的话，执行一下这段命令

```shell
git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch Rakefile' HEAD
```

再运行`./email.sh`脚本

这时候虽然本地修改成功了，但是你还没有推送到远程

所以再执行一下命令

```shell
git push origin --force --all
```

去看一下Github你就会发现之前的绿色加上了