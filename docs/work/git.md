

## git常用命令
- echo "# git" >> README.md
- git init
- git add README.md
- git commit -m "first commit"
- git remote add origin git@github.com:jianglin521/git.git
- git push -u origin master
- git status：查看仓库状态
- git init：吧当前的目录变成可以管理的git仓库，生成隐藏的.git文件
- git add xx：把xx文件添加到暂存区
- git commit -m “xx”a.txt ：提交文件 -m后面的是注释
- git log：查看历史日志
- git reflog：简化版的日志，查看id
- git diff：对比与上一版本的不同
- git reset --hard HEAD^：往上回退一个版本
- git checkout -xx：把xx文件在工作区的修改全部撤销
- mkdir XX：创建一个空目录 XX指目录名
- pwd：显示当前目录的路径
- touch xx：新建xx文件文件录
- cat xx：查看xx文件内容
- git rm xx：删除xx文件 之后要commit
- git branch -d dev：删除dev分支
- git branch xxx：创建分支xxx
- git remote add origin https://github.com/qiuhaifeng01/a.git 关联一个远程库
- git push -u（第一次要用-u以后不用）origin master：把当前master分支推送到远程库
- git clone https://github.com/xxxxx   从远程库中克隆
- git checkout -b dev：创建dev分支 并切换到dev分支上
- git branch：查看当前所有的分支
- git checkout master：切换回master分支
- git merge dev：在当前分支合并dev分支
- git remote：查看远程库信息
- git remote -v查看远程库的详细信息
- git push origin master：git会把master分支推送到远程库对应的分支上

## git与gitHub关系
 Git和Github联系:程序员电脑的 git 仓库向 GitHub 的仓库提交代码

## git本地仓库 Git
第一个: 工作区(working dir) 你的工作目录
第二个: 暂存区（Index/Stage）它像个缓存区域，临时保存你的改动
第三个: 版本区(HEAD), 它指向你最后一次提交的结果

![](http://i.imgur.com/w6IhcMa.jpg)

## git 和 github关联
- 第一步: 创建本地密匙
 - ssh-keygen -t rsa -C "youremail@example.com"
- 第二步: 登陆GitHub 操作
 - settings - SSH and GPG Keys - New SSH key
 - Title随便输. Key粘贴 id_rsa.pub 中的内容
- 第三步: 设置全局用户
 - git config --global user.email "17610835880@163.com"
 - git config --global user.name "jianglin521"
- 第四步:  断开关联
 - git remote remove origin 断开关联 

## 常用操作
### 1.创建仓库
- 创建远程仓库
 - 点击 + 号  new repository
 - README  编写仓库说明
- 创建本地仓库
 1. 克隆远程仓库到本地 
	 - git clone 远程仓库URL
 2. 新生成本地仓库
	 - git init 或 当前工作目录 右键 - git Init Here
	 - 把项目拷贝到该工作目录中
	 - git remote add origin (远程仓库的SSH地址)

### 2.提交本地仓库
- git status (查看文件状态)
- git add * (当前目录下所有文件都添加到暂存区)
- git commit -m 'commit说明'  (从暂存区提交到版本区)
- git commit -am 'commit说明'(直接提交到版本去)

### 3.推送本地到远程仓库
- git push origin master

### 4.远程仓库同步到本地
- git pull origin master 同步远程到本地的工作区
- git fetch origin master 取得远程的代码但不合并
- git fetch 与 git pull 的比较
	- pull = fetch + merge

### 5.分支与合并
- git branch 查看当前分支
- git branch branch-name  创建新分支
 - branch-name 分支的名字
- git checkout  branch-name 切换分支	
- git checkout master 切换回主分支
- git checkout  branch-name  切换回分支
- git branch -D  branch-name  删除分支
- git diff <1-branch> <2-branch> 比较分支两个分支
- git merge (branch文件) 合并分支(需要在主分支进行)

### 6.替换工作区中的内容
- git reset --hard (commitID) 回到某个版本
- git checkout -- <当前文件名> 放弃现在修改.用版本库替换当前状态

### 7.打标签
- git log 查看提交日志
- git reflog 查看所有日志详情
- git tag 版本信息 (某个提交ID) 给重要版本创建标签
- git tag 查看保存的重要版本信息





 


