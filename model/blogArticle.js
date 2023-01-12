const connection=require('./index')

module.exports.addArticle=(fn,data)=>{
    let sql=`insert into blog_article(title,author,disgest,content,content_source_url,thumb_media_id,need_open_comment,only_fans_can_comment,createTime) values (
        "${data.title}","${data.author}","${data.disgest}","${data.content}","","${data.thumb_media_id}",${data.need_open_comment},${data.only_fans_can_comment},"${Date.now()}"
    );`
    connection.query(sql,fn)
}

module.exports.editArticle=(fn,data)=>{
    let sql=`update blog_article set title="${data.title}",author="${data.author}",content="${data.content}",content_source_url="",thumb_media_id="${data.thumb_media_id}",need_open_comment=${data.need_open_comment},only_fans_can_comment=${data.only_fans_can_comment} where id=${data.id};`
    connection.query(sql,fn)
}

module.exports.selectArticle=(fn,data)=>{
    let  sql=''
    if(data.startTime>0){
        sql=`select * from blog_article where status=1 and title like '%${data.title}%' and createTime >= ${data.startTime} and createTime < ${data.endTime} limit ${(data.page_no-1)*data.page_size} , ${data.page_size};`
    }else{
        sql=`select * from blog_article where status=1 and title like '%${data.title}%' limit ${(data.page_no-1)*data.page_size} , ${data.page_size};`
    }
    connection.query(sql,fn)
}

module.exports.selectCount=(fn,data)=>{
    let  sql=''
    if(data.startTime>0){
        sql=`select count(*) as num from blog_article where status=1 and title like '%${data.title}%' and createTime >= ${data.startTime} and createTime < ${data.endTime};`
    }else{
        sql=`select count(*) as num from blog_article where status=1 and title like '%${data.title}%';`
    }
    connection.query(sql,fn)
}

module.exports.deleteArticle=(fn,data)=>{
    let sql=`update blog_article set status=0 where id=${data.delId}`
    connection.query(sql,fn)
}

module.exports.selectOnlyArticle=(fn,data)=>{
    let sql=`select * from blog_article where id=${data.id}`
    connection.query(sql,fn)
}