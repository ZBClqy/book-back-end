const connection=require('./index')

module.exports.AddTable=function(data){

    let sql=`insert into blog_label(label_name,create_time) values (
        "${data.label_name}",
        ${data.create_time}
    );`
    
    connection.query(sql,(err,result,fields)=>{
        if(err){
            return false
        }
        return true
    })
}

module.exports.SelectTable=function(fn,data){
    
    let sql=`select * from blog_label where status = 1 limit ${(data.page_no-1)*data.page_size} , ${data.page_size};`
    connection.query(sql,fn)
}

module.exports.SelectAllTable=function(fn){

    let sql=`select * from blog_label where status = 1`
    connection.query(sql,fn)

}

module.exports.SelectCount=function(fn){
    let sql=`select count(*) as num from blog_label where status = 1`
    connection.query(sql,fn)
}

module.exports.DelTable=function(fn,delId){
    let sql=`update blog_label set status=0 where id=${delId}`
    connection.query(sql,fn)
}

module.exports.UpdateTable=function(fn,data){
    let sql=`update blog_label set label_name="${data.label}" where id=${data.id}`
    connection.query(sql,fn)
}