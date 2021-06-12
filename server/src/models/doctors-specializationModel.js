var dbconnection = require('../../server')

var DoctorsSpecialization = function(doctorsspecialization){
    this.Id = doctorsspecialization.Id;
    this.SpecializationId = doctorsspecialization.SpecializationId;
    this.DoctorsList	= doctorsspecialization.DoctorsList
}

DoctorsSpecialization.checkSpecializationAlreadyExists = function(Id,result){
    console.log(Id)
    dbconnection.query(`SELECT SpecializationId FROM doctors_specialization WHERE SpecializationId='${Id}'`,function(err,res){
        if(err){
            console.log(err)
            ReadableStreamDefaultController(err,null)
        }
        result(null,res)
    })
}

DoctorsSpecialization.addNewSpecialization = function(new_data,result){
 
    
   // var data = JSON.parse(new_data.DoctorsList);
    console.log('data',new_data.DoctorsList)
    var responseJson = JSON.parse(new_data.DoctorsList);
    console.log('responseJson',responseJson)

   dbconnection.query(`INSERT INTO doctors_specialization (SpecializationId,DoctorsList) VALUES ('${new_data.SpecializationId}',(${responseJson}))`,function(err,res){
          if(err){
              console.log(err)
              result(err,null)
          }
          result(null,res)
   })
}

DoctorsSpecialization.updateSpecialization = function(update_data,result){
    console.log("update",update_data.DoctorsList)
    dbconnection.query(`UPDATE doctors_specialization SET DoctorsList="${update_data.DoctorsList}" WHERE SpecializationId='${update_data.SpecializationId}' `,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

module.exports = DoctorsSpecialization