function JsonResult(bool,data){
    if(bool){
        return {
            code:200,
            data:data,
            msg:'success'
        }
    }else{
        return {
            code:400,
            msg:'error'
        }
    }
}

module.exports=JsonResult