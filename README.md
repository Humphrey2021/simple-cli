# 脚手架

通过nodejs开发一款小型的脚手架工具, 来更加直观的了解一下脚手架的工作过程

> 脚手架其实就是nodejs的一个cli应用

## 创建文件
```shell
mkdir sample-scaffolding
cd sample-scaffolding
yarn init
```
## 编辑package.json文件
```json
// package.json
{
    "bin": "cli.js"
}
```
## 根目录创建 cli.js 文件，并编写逻辑
```js
#!/usr/bin/env node
// node cli 应用入口文件必须要有这样的文件头

// 如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 其实就是通过 chmod 755 cli.js 实现修改

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')
// 1. 通过命令行交互询问用户问题
    // 询问需要用到 node 的 inquirer 模块
    // 在命令行运行 yarn add inquirer
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'project name?'
    }
])
.then(anwsers => {
    // 2. 根据用户回答的结果来生成文件
    // 模版目录
    // 在根目录创建 templates 文件夹, 并在内部创建一些模版文件
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录 (在哪里运行，在哪里生成文件)
    const destDir = process.cwd() // 获取到运行命令的文件夹路径
    // 将模版下的文件全部输出到目标目录
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            // file 就是相对路径
            // 安装模版引擎，这里使用的是 ejs
            // 在命令行运行 yarn add ejs
            ejs.renderFile(path.join(tmplDir, file), anwsers, (e, result) => {
                if (e) throw e
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})
```
## 应用
```shell
# 将此文件 link 到全局
yarn link
# 执行模块名
sample-scaffolding
## 就可以在目标目录生成对应格式的文件
```
