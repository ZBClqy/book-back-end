const express=require('express')
const router=express.Router()
const { AddTable,SelectTable,DelTable,UpdateTable,SelectCount,SelectAllTable }=require('../model/blogLabel')
const JsonResult=require('../message/index')

router.post('/add/label',async (req,res,next)=>{
    try{
        let dataObj={
            label_name:req.body.table,
            create_time:Date.now()
        }
        let response = await AddTable(dataObj)
        if(response){
            JsonResult(true,'')
        }else{
            JsonResult(false)
        }
    }catch(err){/** */}
})

router.get('/select/label',async (req,res,next)=>{
    try{
        SelectTable((err,result)=>{
            if(err){
                res.send(JsonResult(false))
            }else{
                let data={data:result}
                SelectCount((err,result)=>{
                    if(err){
                        res.send(JsonResult(false))
                    }else{
                        data.total=result[0].num
                        res.send(JsonResult(true,data))
                    }
                })
            }
         
        },req.query)
    }catch(err){/** */}
})

router.delete('/delete/label',async (req,res,next)=>{
    try{
        DelTable((err,result)=>{
            if(err){
                res.send(JsonResult(false))
            }else{
                res.send(JsonResult(true,''))
            }
        },req.body.delId)
    }catch(err){/** */}
})

router.put('/update/label',async (req,res,next)=>{
    try{
        UpdateTable((err,result)=>{
            if(err){
                res.send(JsonResult(false))
            }else{
                res.send(JsonResult(true,''))
            }
        },req.body)
    }catch(err){/** */}
})

router.get('/selectAll/label',async (req,res,next)=>{
    try{
        SelectAllTable((err,result)=>{
            if(err){
                console.log(err)
                res.send(JsonResult(false))
            }else{
                res.send(JsonResult(true,result))
            }
        })
    }catch(err){/** */}
})

module.exports=router