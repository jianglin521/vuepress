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
    "build": "tsc -watch" // 编译并监视
  }
```

## 语法
### typescript中数据类型
`typescript`中为了代码的更加规范、更加有利于维护，提供了以下数据类型
1. 布尔类型（boolean）
```ts
let flag:boolean = false
flag = true
```
2. 数字类型（number）
```ts
let num:number = 100
num = 200
```
3. 字符串类型（string）
```ts
let str:string = 'this is ts'
str = 'haha'
```
4. 数组类型 （array）ts中定义数据有两种方式
```ts
// 1. 第一种定义数组的方式
let arr1:number[] = [1,2,3,4]

// 2. 第二种定义数组的方式
let arr2:Array<number> = [1,2,3,4]
```
5. 元组数据类型（tuple）属于数组的一种
```ts
let arr:[number,string] = [1, 'str']
```
6. 枚举数据类型（enum）
```ts
enum Err {'undefined' = -1, 'null' = -2, 'success' = 1}
let s: Err = Err.success
console.log(s, '我是枚举数据')
```






