
const TimeSchedule = require('../models/time-scheduleModel')

function checkalreadyavailablegivendata(data,callback){
    TimeSchedule.checkalreadyavaialblegivenfield(data,function(err,res){
        callback(res)
    })
}

exports.add_new_schedule= function(req,res){   
    var new_TimeSchedule = new TimeSchedule(req.body)
      
     
    new_TimeSchedule.TimeAndDate = new_TimeSchedule.TimeAndDate.replace(/\'/gi,'"')   
    console.log(new_TimeSchedule.TimeAndDate)
   // var obj = JSON.parse(new_TimeSchedule.TimeAndDate);
    //console.log(obj)

    var mycallback1= checkalreadyavailablegivendata(new_TimeSchedule,function(bool){
      console.log(bool)
       if(bool.length==0){
          TimeSchedule.addnewschedule(new_TimeSchedule,function(err,result){
                if(err){
                    console.log(err);
                    return res.status(400).send('Error with save  try again')
                }
                return res.json(new_TimeSchedule)
          }) 
        }
        else{
            TimeSchedule.updateschedule(new_TimeSchedule,function(err,result){
                if(err){
                    console.log(err);
                    return res.status(400).send('Error with save  try again')
                }
                return res.json(new_TimeSchedule)
          }) 
        }
    })      
}

exports.get_scheduleby_DoctorId = function(req,res){
    console.log(req.query.Did)
    TimeSchedule.getschedulebyDoctorId(req.query.Did,function(err,result){
        if(err){
            console.log(err)
            return res.status(400).send('Error with save  try again')
        }
        console.log(JSON.parse(JSON.stringify(result)))
        return res.json(JSON.parse(JSON.stringify(result)))
    })
}
exports.get_scheduleby_HospitalId = function(req,res){
    TimeSchedule.getschedulebyHospitalId(req.query.Hid,function(err,result){
        if(err){
            console.log(err)
            return res.status(400).send('Error with save  try again')
        }
        return res.json(JSON.parse(JSON.stringify(result)))
    })
}

exports.get_scheduleby_SpecializationId = function(req,res){

    TimeSchedule.getschedulebySpecializationId(req.query.Sid,function(err,result){
        if(err){
            console.log(err)
            return res.status(400).send('Error with save  try again')
        }
        console.log(JSON.parse(JSON.stringify(result)))
        return res.json(JSON.parse(JSON.stringify(result)))
    })
}


