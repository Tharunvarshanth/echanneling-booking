const Doctor = require('../models/doctorModel')

function getnewuserid(callback){
    Doctor.getLastUserID(function(err,id){
        if(err){
            callback(null)
        }
        else if(id.length == 0){
            callback('doc-1')   
        }
        else{
        var  results=JSON.parse(JSON.stringify(id))  
               
        var  i = results[0].Id;
             i = parseInt(i.replace('doc-',''))  +1
             i = 'doc-'+i
        callback(i)
    }   
    })
}

function checkuseralreadyhasaccount(Name,callback){
     Doctor.checkalreadyexiststhisName(Name,function(err,res){
         callback(res)
     })
}




exports.add_new_doctor = (req,res)=>{
    var new_doctor = new Doctor(req.body)

 var mycallback1 = checkuseralreadyhasaccount(new_doctor.Name,function(bool){
     if(bool.length!=0){
         return res.status(400).send("doctor already has logged");  
     }
     var mycallback2 = getnewuserid(function(new_id){
     
      if(new_id==null){
        return  res.status(400).send({ error:true, message: 'Error try again Id ' });      
      }
      else{
          new_doctor.Id = new_id
        Doctor.addnewDoctor(new_doctor,function(err,result){
            if(err){
                console.log(err);
                return res.status(400).send('Error with save doctor try again')
            }
            return   res.json({doctor:new_doctor});       
        })
      }
   })
  })
}

exports.doctors_name_and_id_list = (req,res)=>{
    Doctor.getNameAndIDList(function(err,list){
        console.log(list)

        if(err){
            return res.status(400).send('Error with save doctor try again')
            }
          

            return   res.json(JSON.parse(JSON.stringify(list)) );    
        })
}

exports.doctors_detail_by_id = (req,res)=>{
    const docid = req.query.Id
    Doctor.getdetailsbyID(docid,function(err,info){
        
        if(err){
            return res.status(400).send('Error with save database try again')
        }
        var output = JSON.parse(JSON.stringify(info))[0]
        return res.json(output)
    })
}
