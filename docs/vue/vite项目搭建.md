## vite项目搭建
## 安装
```shell
pnpm create vite # 手动创建
pnpm create vite my-vue-app -- --template vue-ts # 自动创建
```

## pnpm
我选用的是 `pnpm`，创建非扁平化的 `node_modules`，对比`npm`能够避免一些错误：

1. 依赖结构的不确定性。
2. 扁平化算法本身的复杂性很高，耗时较长。
3. 项目中仍然可以非法访问没有声明过依赖的包。
