/**
 * 数据操作文件模块
 */
var fs = require('fs')

var dbPath ='./db.json'
/**
 * 获取所有学生
 */

exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

/**
 * 添加学生
 */

exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length-1].id+1
        students.push(student)
        var fileData = JSON.stringify({students:students})
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            return callback(null)
        })
    })
}
/**
* 更新学生
*/

exports.updateById = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students  = JSON.parse(data).students
        student.id =  parseInt(student.id)
        var stu = students.find(function(item){
            return item.id === student.id
        })

        //拷贝对象
        for(key in student){
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({students:students})
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            return callback(null)
        })
        
    })
}
/**
 * 删除学生
 */

exports.delete = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        students.forEach(function(element,index) {
            if(element.id == id){
                console.log(element)
                students.splice(index,1)
                var fileData = JSON.stringify({students:students})
                fs.writeFile(dbPath,fileData,function(err){
                    if(err){
                        return callback(err)
                    }
                    return callback(null)
                })
            }
        });
    })
}

/**
 * 根据id查询学生信息
 */
exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id ===id
        })
        callback(null,ret)
    })
}