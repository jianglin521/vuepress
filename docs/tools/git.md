# git使用
## gitHub创建秘钥
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

## git命令
[地址](https://juejin.im/post/6869519303864123399)
