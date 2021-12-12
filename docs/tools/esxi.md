## 请输入大于原始容量的磁盘大小
> 解决ESXI安装OpenWrt编辑虚拟机提示“请输入大于原始容量的磁盘大小”问题的方法
> [教程地址](https://wp.gxnas.com/10122.html)

```shell
cd /vmfs/volumes/datastore1
vmkfstools -X 2048M openwrt-x86-64-generic-squashfs-combined-efi.vmdk
```
