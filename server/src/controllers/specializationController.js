
const Specialization = require('../models/specializationModel')

function get_new_Id(callback){
    Specialization.getLastId(function(err,id){
        if(err){
            callback(null)
        }
        else if(id.length==0){
            callback("spe-1")
        }
        else{  
        var  results=JSON.parse(JSON.stringify(id))                
        var  i = results[0].Id;          
             i = parseInt(i.replace('spe-',''))  +1
             i = 'spe-'+i
             console.log(i)
        callback(i)
        }
    })
}

function checkalreadyspecializationexists(type,callback){
    Specialization.checkAlreadyTypeExists(type,function(err,res){
        callback(res)
    })
}

exports.addNewType = (req,res)=>{
    const new_specialization = new Specialization(req.body)
    console.log("testing")
    var mycallback1 = checkalreadyspecializationexists(new_specialization.Type,function(bool){
        if(bool!=null)  {
            if(bool.length!=0 ){
                return res.status(400).send("Hospital Name already has logged");  
            }
           }
        var mycallback2 = get_new_Id(function(new_id){
            if(new_id==null){
                
                return  res.status(400).send({ error:true, message: 'Error try again Id ' });      
              }
              else{
                  new_specialization.Id = new_id;
                  Specialization.addNewType(new_specialization,function(err,result){
                     if(err){
                        console.log(err);
                        return res.status(400).send('Error with save hospital try again')
                     }
                         return res.json({type:new_specialization})
                  })
              }
        })   
    })
}

exports.get_all_types_id = (req,res)=>{
    Specialization.getAllTypesAndId(function(err,result){
         if(err){
            console.log(err);
            return res.status(400).send('Error with save hospital try again')
         }
         var output = JSON.parse(JSON.stringify(result))
         return res.json(output)
    })
}


exports.get_type_by_id = function(req,res){
    var id = req.query.Id
   
    Specialization.getTypeById(id,function(err,result){
        if(err){
            return res.status(400).send('Error with get specialization detail')
        }
        var output = JSON.parse(JSON.stringify(result))[0]
        console.log(output)
        return res.json(output.Type)
    })
}