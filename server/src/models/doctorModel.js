var dbconnection = require('../../server')

var Doctor = function(doctor){
    this.Id = doctor.Id;
    this.Name = doctor.Name;
    this.Email = doctor.Email;
    this.Mobile = doctor.Mobile;
}

Doctor.getLastUserID = function(result){
    dbconnection.query("SELECT Id FROM doctors ORDER BY Id DESC LIMIT 1",function(err,res){
           if(err){
               console.log(err)
               result(err,null)
           }
           result(null,res)

    })
}

Doctor.checkalreadyexiststhisName = function(Name,result){
    dbconnection.query( `SELECT * FROM doctors WHERE Name='${Name}'`,function(err,res){
        if(err){
            result(err,null)
            
        }
        result(null,res)

    })
}

Doctor.addnewDoctor = function(newdoctor,result){
    dbconnection.query("INSERT INTO doctors SET ?",newdoctor,function(err,res){
        if(err){
            console.log("Add new Doctor err",err)
            result(err,null)
           
        }
        result(null,res)
        
    })
}

Doctor.getNameAndIDList = function(result){
    dbconnection.query("SELECT  Id,Name FROM doctors",function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

Doctor.getdetailsbyID  = function(Id,result){
    dbconnection.query(`SELECT * FROM doctors WHERE Id='${Id}'`,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}



module.exports = Doctor