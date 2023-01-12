const mysql=require('mysql')
const env={
    host:'localhost',
    port:'3306',
    user:'book',
    password:'root',
    database:'book'  
}

let connection;

function handleError(err){
    if(err){
        connection=null
        connect()
    }
}

function connect(){
    connection=mysql.createConnection(env)
    connection.connect(handleError)
    connection.on('error',handleError)
}

connect()

setInterval(()=>{
    connection.ping()
},60000)

module.exports=connection