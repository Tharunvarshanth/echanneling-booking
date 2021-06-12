"use strict";
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../utils/config');

var User = require('../models/userModel')

 
function getnewuserid(callback){    
    User.getLastUserId( function(error,id){      
          var  results=JSON.parse(JSON.stringify(id))  
               
          var  i = results[0].Id;
               i = parseInt(i.replace('eha-',''))  +1
               i = 'eha-'+i
          callback(i)        
      })   
         
}   

function checkuseralreadyhasaccount(Username,callback){
    User.checkuserhasaccount(Username,function(error,res){
        callback(res)
    })
}


exports.create_user =(req,res)=>{ 
    var new_user  = new User(req.body);
  var mycallback1 = checkuseralreadyhasaccount(new_user.Username,function(bool){
      
   if(bool.length!=0){
       console.log(bool)
       return  res.status(400).send("user already has logged");    
   }
   var mycallback=getnewuserid(function(new_id) {    
   
    if(new_id==null){       
        return  res.status(400).send({ error:true, message: 'Error try again Id ' });         
    }
    else{
      
        var hashedPassword = bcrypt.hashSync(new_user.Password, 8);
        new_user.Id= new_id
        new_user.Password = hashedPassword
        User.createUser(new_user,function(err,userres){
            if (err){
             return res.status(400).send(err);
            }            
            
            let payload = {subject:new_user.Username}
            let token = jwt.sign(payload,config.secret,{expiresIn:86400})  
            
         return   res.json({token:token,role:new_user.Role,auth:true});       
        });
    }

    });
})  ;
}

exports.login = function(req,res){
     console.log(req.body)
    User.login(req.body,function(err,userres){
            if(err){
              return  res.send(err)
            }
            var results = JSON.parse(JSON.stringify(userres))

            var passwordIsValid = bcrypt.compareSync(req.body.Password, results[0].Password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            let payload = {subject:results[0].Username}
            let token = jwt.sign(payload,config.secret,{expiresIn:86400})            
            return res.status(200).json({token : token, role : results[0].Role, auth: true });   
    })
}

exports.get_userinfo = function(req,res){

    User.getUserInfo(req.query.username,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        var results = JSON.parse(JSON.stringify(result))

        return res.status(200).json(results[0])
    });
}

exports.edit_user_info = function(req,res){
    console.log(req.body)
    var editUser = new User(req.body)
    console.log(editUser)
    User.editUserInfo(editUser,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        var results = JSON.parse(JSON.stringify(result))

        return res.status(200).json(results[0])
    })
}