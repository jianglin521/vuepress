# git使用

[教程地址](https://juejin.im/post/6869519303864123399)

## Git 常用命令

[参考地址](http://cleaner.love/tool/git.html)

- `git add`：代码提交到本地暂存区
- `git commit -m ''`：代码提交到本地仓库
- `git push`：代码提交到远程仓库
- `git pull`：拉取远程仓库代码到本地
- `git clone` ：克隆远程仓库代码到本地
- `git branch -m master main`：本地代码分支重命名（master 重命名为 main）。本地分支和远程分支名称不同时，可以通过该命令来同步分支名称
- `git remote -v`：查看本地仓库关联的远程仓库
- `git remote remove origin`：删除关联的远程仓库
- `git remote add origin xxx`：关联远程仓库
- `git pull origin master --allow-unrelated-histories`：允许不相关历史提交，并强制合并。执行 Git 命令报错`fatal: refusing to merge unrelated histories`时使用，然后再解决冲突。
- `git config --global init.defaultBranch main` 修改git本地init出来的默认master变为main。

## 项目开发中的 Git 规范

### git commit 提交信息规范

**常用：**

- feat：新增功能
- fix：bug 修复
- refactor：重构代码（既没有新增功能，也没有修复 bug）
- docs：文档更新
- test：新增测试用例或是更新现有测试
- perf：性能, 体验优化
- revert：回滚某个更早之前的提交

**不常用（相对来说使用没那么频繁）：**

- style：不影响程序逻辑的代码修改（修改空白字符，格式缩进等）
- ci：主要目的是修改项目继续集成流程（Jenkins，GitLab CI 等）的提交
- chore：不属于以上类型的其他类型，比如构建流程, 依赖管理

### 代码提交流程

![代码提交流程.png](https://s2.loli.net/2023/09/05/o64sHE2Jq71ZCMI.png)。

## git删除本地空目录

```shell
git clean -fd
```

## 解决vue-cli使用gitHooks失效问题

### 关于 Git Hook 官方说明
>
> yorkie 和 husky 两者的功能是一样的，都是生成一些 git hooks 文件，再读取项目中 package.json 的相关配置去执行一些命令

### 问题原由

后续由于手动误删了项目根目录下的 `.git` 目录，导致项目在 `commit` 时无法触发 `Git Hook`

### 问题解决

找到如下路径：`node_modules/yorkie/bin/install.js`
再使用 `node` 执行此文件，重新生成 `.git` 目录中 `.git/hooks` 即可

## 配置单个github

### 配置用户名和邮箱（如果已经配置，就跳过）

```bash
  git config --global user.name 'xxx' 
　git config --global user.email 'xxx@xx.xxx'
```

### 检查下自己之前有没有已经生成shh

 cd ~/.ssh

 **注意** C:/Users/92536/.ssh - windows本地位置

如果能进入到.ssh文件目录下 ，则证明，之前生成过.ssh秘钥，可以直接使用里面的秘钥。

### 生成秘钥

```bash
  ssh-keygen -t rsa -C 'xxx@xx.xxx' // 配置的邮箱
```

接着按3个回车 :
![](https://i.loli.net/2019/04/10/5cadbdb9165a5.png)

最后在.ssh目录下得到了两个文件：id_rsa（私有密钥）和id_rsa.pub（公有密钥）

### 将公有密钥添加到github SSH keys

使用记事本等软件打开id_rsa.pub文件，将里面的内容复制，粘贴到github的New SSH key

### 验证是否连接成功

```bash
  ssh git@github.com
```

### git clone使用指定用户名和密码

```shell
git clone http://邮箱（或用户名）:密码@仓库地址
```

## git不同项目设置不同用户名

每个git项目下都会有一个隐藏的.git文件夹，发现该目录下有个config文件，采用

```shell
# 添加如下配置
[user]
    name = XXX(自己的名称)
    email = XXXX(邮箱)
```

## 配置多个github

### 生成两个新的SSH key

```shell
 ssh-keygen -t rsa -C '176xxx@xx.xxx' // 账号一的注册邮箱
 ssh-keygen -t rsa -C '925xxx@xx.xxx' // 账号二的注册邮箱
```

**注意**：重点的是**第二次**生成的文件到**第二步的时候不要回车-》要修改名字**，比如第一次时id_rsa第二次就是id_rsa_two，命名随意，但是要区分开，不然第二次生成的文件会覆盖第一次生成的文件。
文件存放地址要注意，第一次和第二次存放地址要一致。

### 配置~/.ssh/config文件

创建`config`文件

```shell
# 该文件用于配置私钥对应的服务器
# jianglin521
Host git@github.com
HostName github.com
User jianglin521
IdentityFile ~/.ssh/id_rsa

# jianglin2020
Host jianglin2020.github.com
HostName github.com
User jianglin2020
IdentityFile ~/.ssh/id_rsatwo
```

### 测试 ssh 链接

```shell
ssh -T git@github.com
ssh -T git@jianglin2020.github.com
```

### github.com代理

```bash
# 设置代理
git config --global http.https://github.com.proxy http://127.0.0.1:7890
# 查看代理
git config --global --get http.https://github.com.proxy
# 取消代理
git config --global --unset http.https://github.com.proxy
```

## git上传项目指令

1. 先进去到项目文件夹，通过命令 git init把这个项目编程git可以管理的仓库
   `git init`

2. 把文件添加到版本库中，使用命令 git add .添加到暂存区里面（不要忘记后面的 . ，意为添加文件夹下的所有把文件）
   `git add .`

3. 用命令 git commit告诉git，把文件提交到仓库。引号内为提交说明
   `git commit -m 'commit'`

4. 关联到远程库
   `git remote add origin https://xxx/xxx/xx.git`

5. 上传代码之前，要先 pull一下，拉取代码
   `git pull origin master`

6. 把本地的内容推送到远程仓库，使用 git push命令，实际上是把当前分支master推送到远程。执行此命令狗要求输入用户名、密码，验证通过后即开始上传。
   `git push -u origin master`

7. 状态查询命令
   `git status`
