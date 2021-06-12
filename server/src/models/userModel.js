
var dbconnection = require('../../server');

var User = function(user){
    this.Id = user.Id;
    this.Username = user.Username;
    this.Password = user.Password ;
    this.Displayname = user.Displayname;
    this.Mobile  = user.Mobile;
    this.Role = user.Role;
}

User.createUser = function(newUser,result){
   console.log(newUser)
    dbconnection.query("INSERT INTO users set ?",newUser,function(err,res){
        if(err){
            console.log("user createuser error",err)
            result(err,null);     
                
        } 
        else{
            console.log(res);
            result(null, res);
        }
    })
}

User.login = function(userInfo,result){
    dbconnection.query(`SELECT *  FROM users WHERE Username='${userInfo.Username}'`,function(err,res){
        if(err){
            console.log("user createuser error",err)
            result(null,err)
            
        }
        else{
            console.log(res);
            result(null, res);
          
        }
    })
}

User.getUserInfo = function(username,result){
    console.log(username)
    dbconnection.query(`SELECT *  FROM users WHERE Username='${username}'`,function(err,res){
        if(err){
            console.log("Error cannot get userinfo",err)
            result(null,err)
            
        }
        else{
            console.log(res)
            result(null,res)
        }
    })
}

User.getLastUserId = function(result){
    
    dbconnection.query("SELECT Id FROM users ORDER BY Id DESC LIMIT 1 ",function(err,res){
        if(err){
            console.log("error",err);
            result(null,err)

        }
        else{
           result(null,res)
        }
    })
    
}

User.getAllUsers = function(result){
    
    dbconnection.query("SELECT * FROM users",function(err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
          
        }
        else{
          console.log('tasks : ', res);  

         result(null, res);
        }
    })
}

User.editUserInfo = function(userinfo,result){
    dbconnection.query(`UPDATE users SET Username ='${userinfo.Username}', Displayname = '${userinfo.Displayname}',Mobile = '${userinfo.Mobile}' WHERE Id= '${userinfo.Id}' `,function(err,res){
        if(err){
            console.log("err",err)
            result(err,null)
        }else{
            result(null,res)
        }
    })     
}

User.checkuserhasaccount  = function(Username,result){
    console.log("cre")
    dbconnection.query(`SELECT * FROM users WHERE Username='${Username}'`,function(err,res){
        if(err){
            console.log("err",err)
            result(err,null)
            
        }
        else{
            result(null,res)

        }
    })
}

module.exports = User;
