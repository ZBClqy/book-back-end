const express=require('express')
const router=express.Router()
const axios=require('axios')
const JsonResult=require('../message/index')
router.get('/imgList',async (req,res,next)=>{
    try{
        let response= await axios.get('http://test.linqiaoyan.top/wechat/getmaterial')
        res.send(JsonResult(true,response.data))
    }catch(err){}
})
module.exports=router

