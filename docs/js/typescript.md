# Typescript
## 安装
`npm install typescript -g`

## 配置
1. 自动创建配置文件
```sh
  tsc --init // 创建tsconfig.json 文件
```

2. 手动创建配置文件，文件如下
```json
 {
  "compilerOptions": {
    "target": "es5", // 指定ECMAScript目标版本
    "module": "commonjs", // 指定模块化类型
    "declaration": true, // 生成 `.d.ts` 文件
    "outDir": "./dist", // 编译后生成的文件目录
    "strict": true // 开启严格的类型检测
  }
}
```
## 编译
将编译命令添加到 package.json 文件中
```json
 "scripts": {
    "build": "tsc" // 增加 ts 编译命令
  }
```

