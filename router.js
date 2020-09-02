var fs = require('fs')

var express = require('express')
var Students = require('./student')
//创建路由容器
var router = express.Router()

//将路由挂在到路由容器中
router.get('/students',function(req,res){
    Students.find(function(err,students){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('index.html',{
            students:students
        })
    })
})

router.get('/students/new',function(req,res){
    res.render('new.html')
})

router.post('/students/new',function(req,res){
    console.log(req.body)
    //将数据保存到db.json中 进行持久化
    Students.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit',function(req,res){
    Students.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('server error')
        }
        console.log(student)
        res.render('edit.html',{
            student:student
        })
    })
})

router.post('/students/edit',function(req,res){
    Students.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete',function(req,res){
    console.log(req.query)
    Students.delete(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

module.exports = router