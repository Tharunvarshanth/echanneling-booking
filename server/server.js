var mysql = require('mysql')

var dbconnection = mysql.createConnection({
    host:'localhost',    
    user: 'root',
    password: '',     
    database: 'e-channelling'
})

dbconnection.connect(function(err){
    if(err){
        console.log('error connection with mysql',err.stack)
        return ;
    }
    console.log('mysql connected as id ' + dbconnection.threadId);
})


module.exports =    dbconnection;             