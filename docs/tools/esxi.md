# esxi

## esxi8安装

1. 许可秘钥 4V492-44210-48830-931GK-2PRJ4

## iStoreOS安装

1. 输入`quickstart`回车

### 磁盘扩容

```shell
  # 查看分区结构 lsblk
  # 插件 fdisk resize2fs losetup
  # 命令
  fdisk -l
  fdisk /dev/nvme0n1
  losetup /dev/loop0 /dev/nvme0n1p3
  resize2fs -f /dev/loop0
  tar -zxvf ./docker_back.tar.gz -C ./
```
