const express=require('express')
const router=express.Router()
const multer=require('multer')
const JsonResult=require('../message/index')
const path=require('path')
const { addArticle,selectArticle,selectCount,deleteArticle,selectOnlyArticle,editArticle }=require('../model/blogArticle')
const { addAssocition,selectLabels,editAssocition }=require('../model/blogAssocition')
const axios=require('axios')

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../uploads'))
    },
    // 配置文件上传后存储的路径和文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})

router.post('/upload/image',upload.single('file'),(req,res,next)=>{
    if(req.file.path){
        res.send(JsonResult(true,req.file.filename))
    }else{
        res.send(JsonResult(false))
    }
})


router.post('/add/article',async (req,res,next)=>{

    try{
        await axios.post('http://test.linqiaoyan.top/wechat/add',req.body)
        addArticle((err,result,filed)=>{
            if(err){
                res.send(JsonResult(false))
            }else{
                const Obj={ articleid:result.insertId,labelid:req.body.label }
                addAssocition((err,result)=>{
                    if(err){
                        res.send(JsonResult(false))  
                    }else{
                        res.send(JsonResult(true,''))
                    }
                },Obj)
            }
        },req.body)
    }catch(err){
    }
})

router.get('/select/article',async (req,res,next)=>{

    try{
        selectArticle((err,result)=>{
            if(err){
                console.log(err)
                res.send(JsonResult(false))
            }else{
                let data={
                    data:result
                }
                selectCount((err,result)=>{
                    if(err){
                        res.send(JsonResult(false)) 
                    }else{
                        data.total=result[0].num
                        res.send(JsonResult(true,data))
                    }
                },req.query)
                
            }
        },req.query)
    }catch(err){
        console.log(err)
    }
})

router.delete('/delete/article',async (req,res,next)=>{
    try{
        deleteArticle((err,result)=>{
            if(err){
                res.send(JsonResult(false))
            }else{
                res.send(JsonResult(true,''))
            }
        },req.body)
    }catch(err){/** */}
})

router.get('/select/only_article',async (req,res,next)=>{
    try{
        selectOnlyArticle((err,result)=>{
            if(err){
                res.send(JsonResult(false)) 
            }else{
                let data=result
                selectLabels((err,result)=>{
                    if(err){
                        res.send(JsonResult(false)) 
                    }else{
                        data[0].label=result
                        data[0].label= data[0].label.map((item)=>{
                            return item.labelid
                        })
                        res.send(JsonResult(true,data))  
                    }
                },result[0])
               
            }
        },req.query)
    }catch(err){/** */}
})

router.put('/edit/only_article',async (req,res,next)=>{
    try{
        await axios.post('http://test.linqiaoyan.top/wechat/add',req.body)
        editArticle((err)=>{
            if(err){
                res.send(JsonResult(false)) 
            }else{
                editAssocition(()=>{},{id:req.body.id})
                addAssocition(()=>{},{labelid:req.body.label,articleid:req.body.id})
                res.send(JsonResult(true,''))
            }
        },req.body)
    }catch(err){/** */}
})

module.exports=router