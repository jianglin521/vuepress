## vue项目git提交规范
### 功能
1. 自动检测 `commit` 是否规范，不规范不允许提交
2. 自动提示 `commit` 填写格式。不怕忘记规范怎么写
3. 集成 `git add . && git commit` 不需要在执行两个命令
4. 自动生成 `changelog`

### 配置
1. 安装插件
```shell
npm i vue-cli-plugin-commitlint commitizen commitlint conventional-changelog-cli husky right-pad -D
```

2. 在 `package.json` 中添加
```json
{
  "scripts": {
    "log": "conventional-changelog --config ./node_modules/vue-cli-plugin-commitlint/lib/log -i CHANGELOG.md -s -r 0",
    "cz": "npm run log && git add . && git cz"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/vue-cli-plugin-commitlint/lib/cz"
    }
  }
}
```

3. 项目根目录增加 `commitlint.config.js` 配置文件
```js
module.exports = {
  extends: ['./node_modules/vue-cli-plugin-commitlint/lib/lint']
};
```

4. 使用
```shell
npm run cz  # git add . && git commit -m 'feat:(xxx): xxx'
npm run log # 生成 CHANGELOG
```

### 问题
1. ~~提示 `warning: LF will be replaced by CRLF in CHANGELOG.md`~~
   >~~`git config core.autocrlf false`~~


