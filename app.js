const express = require('express')
const app = express()
const port = 3000
require('./model/index.js')
const mainRouter=require('./router/index.js')
const editLabelRouter=require('./router/editLabel.js')
const thirdPartyRouter=require('./router/thirdParty.js')
const editArticleRouter=require('./router/editArticle.js')
const { default: axios } = require('axios')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))

app.all("*",function(req,res,next){
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','content-type,login-token');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    if(req.method.toLowerCase() == 'options')
        res.send('200'); // 让options 尝试请求快速结束
    else
        next();
})


app.use(async function(req,res,next){
  let response=await axios.post('http://admin.linqiaoyan.top/verifyToken',{token:req.headers['login-token']})
  if(response.data.code==200){
    next()
  }else{
    res.send({
        code:404
    })
  }

})

app.use(mainRouter)
app.use(editLabelRouter)
app.use(thirdPartyRouter)
app.use(editArticleRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})