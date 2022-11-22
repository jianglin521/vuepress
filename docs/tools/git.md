# git使用

[教程地址](https://juejin.im/post/6869519303864123399)

## git删除本地空目录
```shell
git clean -fd
```

## 解决vue-cli使用gitHooks失效问题
### 关于 Git Hook 官方说明
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

## 变基

在 Git 中整合来自不同分支的修改主要有两种方法：`merge` 以及 `rebase`。 在本节中我们将学习什么是“变基”，怎样使用“变基”，并将展示该操作的惊艳之处，以及指出在何种情况下你应避免使用它。

### 变基的基本操作

请回顾之前在 [分支的合并](https://git-scm.com/book/zh/v2/ch00/_basic_merging) 中的一个例子，你会看到开发任务分叉到两个不同分支，又各自提交了更新。

![分叉的提交历史。](https://git-scm.com/book/en/v2/images/basic-rebase-1.png)

Figure 35. 分叉的提交历史

之前介绍过，整合分支最容易的方法是 `merge` 命令。 它会把两个分支的最新快照（`C3` 和 `C4`）以及二者最近的共同祖先（`C2`）进行三方合并，合并的结果是生成一个新的快照（并提交）。

![通过合并操作来整合分叉了的历史。](https://git-scm.com/book/en/v2/images/basic-rebase-2.png)

Figure 36. 通过合并操作来整合分叉的历史

其实，还有一种方法：你可以提取在 `C4` 中引入的补丁和修改，然后在 `C3` 的基础上应用一次。 在 Git 中，这种操作就叫做 **变基（rebase）**。 你可以使用 `rebase` 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

在这个例子中，你可以检出 `experiment` 分支，然后将它变基到 `master` 分支上：

```shell
$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command
```

它的原理是首先找到这两个分支（即当前分支 `experiment`、变基操作的目标基底分支 `master`） 的最近共同祖先 `C2`，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件， 然后将当前分支指向目标基底 `C3`, 最后以此将之前另存为临时文件的修改依序应用。 （译注：写明了 commit id，以便理解，下同）

![将 `C4` 中的修改变基到 `C3` 上。](https://git-scm.com/book/en/v2/images/basic-rebase-3.png)

Figure 37. 将 `C4` 中的修改变基到 `C3` 上

现在回到 `master` 分支，进行一次快进合并。

```shell
$ git checkout master
$ git merge experiment
```

![`master` 分支的快进合并。](https://git-scm.com/book/en/v2/images/basic-rebase-4.png)

Figure 38. `master` 分支的快进合并

此时，`C4'` 指向的快照就和 [the merge example](https://git-scm.com/book/zh/v2/ch00/ebasing-merging-example) 中 `C5` 指向的快照一模一样了。 这两种整合方法的最终结果没有任何区别，但是变基使得提交历史更加整洁。 你在查看一个经过变基的分支的历史记录时会发现，尽管实际的开发工作是并行的， 但它们看上去就像是串行的一样，提交历史是一条直线没有分叉。

一般我们这样做的目的是为了确保在向远程分支推送时能保持提交历史的整洁——例如向某个其他人维护的项目贡献代码时。 在这种情况下，你首先在自己的分支里进行开发，当开发完成时你需要先将你的代码变基到 `origin/master` 上，然后再向主项目提交修改。 这样的话，该项目的维护者就不再需要进行整合工作，只需要快进合并便可。

请注意，无论是通过变基，还是通过三方合并，整合的最终结果所指向的快照始终是一样的，只不过提交历史不同罢了。 变基是将一系列提交按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起。

