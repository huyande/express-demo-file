var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()
// 配置服务端渲染
app.engine('html', require('express-art-template'));
//配置静态文件
app.use('/node_modules', express.static('node_modules'))
app.use('/public', express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//挂载路由
app.use(router)

app.listen(3000,function(){
    console.log('app is runnig')
})

