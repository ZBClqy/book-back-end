const connection=require('./index')

module.exports.addAssocition=function(fn,data){
    let str=''
    data.labelid.forEach(element => {
        str+=`(${data.articleid},${element}),`
    });
    str= str.slice(0,str.length-1)
    let sql=`insert into blog_assocition(articleid,labelid) values ${str}`
    console.log(sql)
    connection.query(sql,fn)
}

module.exports.selectLabels=function(fn,data){
    let sql=`select labelid from blog_assocition where articleid=${data.id}`
    connection.query(sql,fn)
}

module.exports.editAssocition=function(fn,data){
    let sql=`delete from blog_assocition where articleid=${data.id}`
    console.log(sql)
    connection.query(sql,fn)
}