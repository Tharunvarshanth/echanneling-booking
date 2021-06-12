const dbconnection = require('../../server')

 var Specialization = function(specialization){
     this.Id = specialization.Id;
     this.Type = specialization.Type;
 }

 Specialization.getLastId = function(result){
    dbconnection.query(`SELECT Id FROM specialization ORDER BY Id DESC LIMIT 1`,function(err,res){
         if(err){
             console.log("err",err)
             result(err,null)
         }
      
         result(null,res)
    }) 
}

Specialization.checkAlreadyTypeExists = function(Type,result){
    dbconnection.query(`SELECT * FROM specialization WHERE Type='${Type}'`,function(err,res){
      
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}

Specialization.addNewType = function(newtype,result){
    dbconnection.query("INSERT INTO specialization SET ?",newtype,function(err,res){
    
        if(err){
            result(err,null)
        }
        result(null,res)
    })
 }

Specialization.getAllTypesAndId  = function(result){
    dbconnection.query("SELECT Id,Type FROM specialization ",function(err,res){
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}


Specialization.getTypeById = function(id,result){
    dbconnection.query(`SELECT Type FROM specialization WHERE Id='${id}'`,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}



 module.exports = Specialization