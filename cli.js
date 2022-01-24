#!/usr/bin/env node

// 必须有这样的一个文件头
// 755 
// chmod 755 cli.js
const inquirer = require('inquirer')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'your project name'
    },
    {
        type: 'input',
        name: 'age',
        message: 'your age'
    },
]).then(anwers => {
    const tmplDir = path.join(__dirname, 'templates')
    const destDir = process.cwd()
    console.log(tmplDir, destDir)
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmplDir, file), anwers, (err, result) => {
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})


