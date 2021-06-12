
const Hospital = require('../models/hospitalModel')


function getnewID(callback){
    Hospital.getLastId(function(err,id){        
       console.log(id)
        if(err){
            callback(null)
        }
        else if(id.length==0){
            callback("hos-1")
        }
        else{  
        var  results=JSON.parse(JSON.stringify(id))                
        var  i = results[0].Id;          
             i = parseInt(i.replace('hos-',''))  +1
             i = 'hos-'+i
             console.log(i)
        callback(i)
        }
    })
}

function checkHospitalNamealreadyexists(Name,callback){
    Hospital.checkAlreadyNameExists(Name,function(err,res){
        callback(res)
    })
}

exports.add_new_hospital = (req,res)=>{
    const new_hospital = new Hospital(req.body)
    
    var mycallback1 = checkHospitalNamealreadyexists(new_hospital.Name,function(bool){
       
       if(bool!=null)  {
        if(bool.length!=0 ){
            return res.status(400).send("Hospital Name already has logged");  
        }
       }
        var mycallback2 = getnewID(function(new_id){

            if(new_id==null){
                console.log("z")
                return  res.status(400).send({ error:true, message: 'Error try again Id ' });      
              }
              else{                  
                  new_hospital.Id = new_id
                  Hospital.addNewHospital(new_hospital,function(err,result){
                      if(err){
                        console.log(err);
                        return res.status(400).send('Error with save hospital try again')
                      }
                      return   res.json({hospital:new_hospital});    
                  })
              }
        })
    })
}

exports.gethospital_name_and_Id =function(req,res){
    Hospital.getHospitalNameAndId(function(err,result){
        if(err){
            return res.status(400).send('Error with get hospital list')
        }
        var output = JSON.parse(JSON.stringify(result))
        return res.json(output)
    })
}

exports.get_hospital_detail_by_id = function(req,res){
    var id = req.query.Id
   
    Hospital.getHospitalDetailById(id,function(err,result){
        if(err){
            return res.status(400).send('Error with get hospital detail')
        }
        var output = JSON.parse(JSON.stringify(result))[0]
        return res.json(output)
    })
}