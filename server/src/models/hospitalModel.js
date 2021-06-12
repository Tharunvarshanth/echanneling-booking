var dbconnection = require('../../server')

var Hospital = function(hospital){
    this.Id = hospital.Id;
    this.Name = hospital.Name;
    this.Email = hospital.Email;
    this.Contact = hospital.Contact;
    this.Location = hospital.Location;
}

Hospital.checkAlreadyNameExists = function(Name,result){
    dbconnection.query(`SELECT * FROM hospital WHERE Name='${Name}'`,function(err,res){
      
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}
Hospital.getLastId = function(result){
    dbconnection.query(`SELECT Id FROM hospital ORDER BY Id DESC LIMIT 1`,function(err,res){
         if(err){
             console.log("err",err)
             result(err,null)
         }
      
         result(null,res)
    }) 
}
Hospital.addNewHospital = function(new_hospital,result){
   dbconnection.query("INSERT INTO hospital SET ?",new_hospital,function(err,res){
   
       if(err){
           result(err,null)
       }
       result(null,res)
   })
}
Hospital.getHospitalNameAndId = function(result){
    dbconnection.query("SELECT Name,Id FROM hospital ",function(err,res){
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}

Hospital.getHospitalDetailById = function(id,result){
    dbconnection.query(`SELECT * FROM hospital WHERE Id='${id}'`,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

module.exports = Hospital