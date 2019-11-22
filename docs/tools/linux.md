## linux安装
### 必须分区
一个为根分区，一个为交换分区。

1，/，根分区，一般所有文件都放在根目录下。

2，swap，虚拟内存，交换分区，一般大小为机器内存的1-2倍。

起码有如上两个分区才可以安装linux系统。建议再增加一个/boot分区，200M左右即可。

### 配置
切换用户 `su root`

编辑网卡信息 `vi /etc/sysconfig/network-scripts/ifcfg-ens33`

重启网络服务 `systemctl restart network`

[设置静态ip](https://blog.csdn.net/zhaoyoulin2016/article/details/80441353)

~~设置临时ip `ifconfig ens33 192.168.199.112`~~

## MySQL5.7
[MySQL5.7安装](https://blog.csdn.net/WYA1993/article/details//88890883)

## 常用命令
### 文件处理-目录处理
- `ls -l` 查看目录文件
- `mkdir [目录]` 创建新目录
- `cd [目录]` 切换目录
- `pwd` 显示当前所在目录
- `rmdir [目录]` 删除空目录
- `cp -rp [原文件或目录] [目标目录]` 复制文件或目录
  * `-r` 复制目录
  * `-p` 保留文件属性
- `mv [原文件或目录] [目标目录]` 剪切文件、改名
- `rm [文件或目录]` 删除文件或目录
  * `-r` 删除目录
  * `-f` 强制执行

### 文件处理-文件处理
- `touch [文件名]` 创建空文件
- `cat [文件名]` 显示文件内容
  * `- n` 显示行号
- `tac [文件名]` 显示文件内容[反向显示]
- `more [文件名]` 分页显示文件内容
  * `(空格)或f` 翻页
  * `(Enter)` 换行
  * `q 或 Q` 退出
- `less [文件名]` 分页显示文件(可向上翻页)
- `head [文件名]` 显示文件前几行
  * `-n` 指定行数
- `tail [文件名]` 显示文件后几行
  * `-n` 指定行数
  * `-f` 动态显示文件尾部内容

### 文件处理-链接命令
- `ln -s [源文件] [目标文件]` 生成链接文件
  * `-s` 创建软链接

**注意**：
1. 软链接相当于windows快捷方式
2. 硬链接特征：
   * `cp -p` + 同步更新
   * 通过i节点识别
   * 不能跨分区
   * 不能针对目录

### 权限管路-权限管理
1. `chmod {ugoa}{+-=}{rwx} [文件或目录]` 改变文件或目录权限
   * `mode=421`
   * `-R` 递归修改

### 文件搜索-文件搜索find
1. `find [搜索范围] [匹配条件]` 文件搜索
   * `find /etc -name init` 在目录etc查找文件
     - `-iname` 不区分大小写
   * `find / -size +204800` 在根目录查找大于100MB文件
     - `+n` 大于 `-n` 小于 `n` 等于
   * `find /home -user guan` 在根目录查找所有者为guan的文件
     - `-group` 根据所属组查找
   * `find /etc cmin -5` 在etc下查找5分钟之内修改过属性的文件或目录
     - `amin` 访问时间 access
     - `cmin` 文件属性 change
     - `mmin` 文件内容 modify
   * `find /etc -size +163840 -a -size -204800` 在etc下查找大于80MB小于100MB的文件
     - `-a` 两个条件同时满足
     - `-r` 两个条件满足一个即可
     - `-type` 文件类型查找 `f`文件 `d` 目录 `l` 软链接文件+
   * `find /etc -name inittab -exec ls -l {} \` 在etc下查找
      

   









