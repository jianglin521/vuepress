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
