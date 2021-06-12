const DoctorsSpecialization = require('../models/doctors-specializationModel')

function check_already_exists(specid,callback){        
    DoctorsSpecialization.checkSpecializationAlreadyExists(specid,function(err,result){
                callback(result)
    })
}


exports.addNewSpecialization = function(req,res){

    var newdoctorsspecialization = new DoctorsSpecialization(req.body)
  
    var mycallback1 =  check_already_exists(newdoctorsspecialization.SpecializationId,function(bool){
      
           if(bool.length==0){
            DoctorsSpecialization.addNewSpecialization(newdoctorsspecialization,function(err,result){
                if(err){
                   console.log(err);
                   return res.status(400).send('Error with save data try again')
                }
                return res.json(newdoctorsspecialization)
           })
           }
           else{
               DoctorsSpecialization.updateSpecialization(newdoctorsspecialization,function(err,result){
                   if(err){
                    console.log(err);
                    return res.status(400).send('Error with save data try again')
                   }
                   return res.json(newdoctorsspecialization)
               })
           }
    })
    
}
