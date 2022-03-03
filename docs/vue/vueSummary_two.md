# vue知识点总结二
## vue上传图片转base64
```js
  getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let fileResult = ''
      reader.readAsDataURL(file)
      //开始转
      reader.onload = function() {
        fileResult = reader.result
      }
      //转失败
      reader.onerror = function(error) {
        reject(error)
      }
      //转结束  咱就resolve出去
      reader.onloadend = function() {
        resolve(fileResult)
      }
    })
  }
```

## vue图片地址转base64
```js
  imageUrlToBase64(img) {
    return new Promise((resolve, reject) => {
    // 一定要设置为let，不然图片不显示
      let image = new Image()
      // 解决跨域问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = this.baseImg + img
      // image.onload为异步加载
      image.onload = () => {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)

        var quality = 0.8
        // 这里的dataurl就是base64类型
        var dataURL = canvas.toDataURL('image/jpeg', quality)
        resolve(dataURL)
      }
    })
  }
```
## 获取指定月份开始时间和结束时间
```js
/* 搜索时间处理 */
export function dateYearMonth(date = {}, format) {
  let time = {
    stime: '',
    etime: ''
  }
  if (date.year && date.month) {
    const value = new Date(date.year, date.month, 0)
    time.stime = moment(value).startOf('month').format(format || 'YYYYMMDD')
    time.etime = moment(value).endOf('month').format(format || 'YYYYMMDD')
  }
  return time
}
```

## vue复制文本
```js
copyUrl(item) {
  const url = '测试文本\n测试文本'
  // 创建一个textarea标签
  let oInput = document.createElement('textarea')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  console.log(oInput.value)
  document.execCommand('Copy')
  ///复制成功后再将构造的标签 移除
  oInput.remove()
}
```
## vue文件下载
```js
export function apiTest(id) {
  return request({
    url: `/api/testApi`,
    method: 'get',
    responseType: 'blob'
  })
}

async onDownload(row, value) { // 打包下载
  const loading = this.startLoading() // loading加载
  let res = await apiTest()
  this.closeLoading(loading) // 关闭loading
  if (!res.headers['content-disposition']) {
    this.$message.error('没有上传！')
    return false
  }
  let disposition = decodeURI(res.headers['content-disposition'])
  let fileName = disposition.split('=')[1]
  let blob = new Blob([res.data])
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = fileName // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放blob对象
  this.$message.success('下载成功')
}
```





