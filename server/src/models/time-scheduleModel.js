var dbconnection = require('../../server')


var TimeSchedule = function(TimeSchedule){
    this.Id = TimeSchedule.Id;
    this.DoctorsId  = TimeSchedule.DoctorsId;
    this.HospitalId = TimeSchedule.HospitalId;
    this.TimeAndDate	= TimeSchedule.TimeAndDate;
    this.SpecializationId = TimeSchedule.SpecializationId;
}

TimeSchedule.addnewschedule = function(new_data,result){
    dbconnection.query(`INSERT INTO timeschedule (DoctorsId,HospitalId,SpecializationId,TimeAndDate) VALUES ('${new_data.DoctorsId}','${new_data.HospitalId}','${new_data.SpecializationId}','${update_data.TimeAndDate}')  `,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

TimeSchedule.getschedulebyDoctorId = function(d_id,result){    
        query = `SELECT  timeschedule.Id,timeschedule.TimeAndDate,hospital.Name as HospitalName,Doctors.Name,specialization.Type
                 FROM timeschedule
                 JOIN hospital ON timeschedule.HospitalId=hospital.Id
                 JOIN doctors ON timeschedule.DoctorsId=doctors.Id
                 JOIN specialization ON timeschedule.SpecializationId=specialization.Id
                 WHERE DoctorsId='${d_id}'`
  
        dbconnection.query(query,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

TimeSchedule.getschedulebyHospitalId = function(h_id,result){    
    query = `SELECT timeschedule.Id,timeschedule.TimeAndDate,hospital.Name as HospitalName,Doctors.Name,specialization.Type
             FROM timeschedule 
              JOIN hospital ON timeschedule.HospitalId=hospital.Id
              JOIN doctors ON timeschedule.DoctorsId= doctors.Id
              JOIN specialization ON timeschedule.SpecializationId = specialization.Id
             WHERE HospitalId='${h_id}'`

    dbconnection.query(query,function(err,res){
    if(err){
        console.log(err)
        result(err,null)
    }
    console.log(res)
    result(null,res)
})
}

TimeSchedule.getschedulebySpecializationId = function(s_id,result){    
    console.log("sd")
    query = `SELECT timeschedule.Id,timeschedule.TimeAndDate,hospital.Name as HospitalName,Doctors.Name,specialization.Type
            FROM timeschedule 
             JOIN hospital ON  timeschedule.HospitalId=hospital.Id
             JOIN doctors ON  timeschedule.DoctorsId=doctors.Id
             JOIN specialization ON timeschedule.SpecializationId = specialization.Id
            WHERE SpecializationId='${s_id}'`


    dbconnection.query(query,function(err,res){
    if(err){
        console.log(err)
        result(err,null)
    }
    result(null,res)
})
}

TimeSchedule.checkalreadyavaialblegivenfield = function(new_data,result){
    dbconnection.query(`SELECT * FROM timeschedule WHERE DoctorsId ='${new_data.DoctorsId}' AND HospitalId = '${new_data.HospitalId}' AND SpecializationId= '${new_data.SpecializationId}'`,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}

TimeSchedule.updateschedule = function(update_data,result){
    dbconnection.query(`UPDATE timeschedule SET TimeAndDate='${update_data.TimeAndDate}' WHERE DoctorsId='${update_data.DoctorsId}' AND	HospitalId='${update_data.HospitalId}' AND SpecializationId='${update_data.SpecializationId}'`,function(err,res){
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null,res)
    })
}


module.exports =TimeSchedule

//'[{"day":"Monday","Time":"12:00 pm","active":true,"reason":""}]'