const Booking = require('../models/bookingModel')


function newId(callback){
    Booking.getLastID(function(err,id){
        if(err){
            callback(null)
        }
        else if(id.length ==0){
            callback("book-1")
        }else{
            var  results=JSON.parse(JSON.stringify(id))  
               
            var  i = results[0].Id;
                 i = parseInt(i.replace('book-',''))  +1
                 i = 'book-'+i
            callback(i)
        }
    })
}

function checkalreadyexiststhisId(Id,callback){
    Booking.alreadybookingIdavailable(Id,function(err,res){
               callback(res)
    })    
}

function getbookinguserList(id,callback){
    Booking.getbookinguserList(id,function(err,res){
        callback(res)
    })
}

exports.getbookinginfoby_scheduleId_scheduletimeanddateindex = (req,res)=>{
   
    var schedule_Id = req.query.schedule_Id;
    var schedule_timetable_index = req.query.ttindex
  
    Booking.getbookingInfoBy_ScheduleId_and_Scheduletimeanddateindex(schedule_Id,schedule_timetable_index,function(err,result){
        if(err){
            return res.status(400).send("Error with data")
        }
       
        if(result.length==0){
            mycallback = newId(function(newid){
                console.log(schedule_Id)
                var newbook = new Booking({Id:newid,lastnumber:0,schedule_Id:schedule_Id,schedule_timeanddate_index:schedule_timetable_index,user_booknumber:'[]'});               
               
                Booking.createIinitialbooking(newbook,function(err,result){
                    if(err){
                        console.log(err);
                        return res.status(400).send('Error with create initial data try again')
                    }
                    else{
                        print((result[0]))
                      return   res.json((result[0])); 
                    } 
                })
            })
        }
        else{
            console.log("result")
            result[0].user_booknumber = JSON.parse(result[0].user_booknumber)
            return res.json((result[0]))
        }
    })
}

exports.addbooking = (req,res)=>{
   
  var   id = req.query.Id;
  var   ln = req.query.ln;
  var userId = req.query.userId
    
    console.log("addbooking");
   


    var mycallback = getbookinguserList(id,function(arraylist){
       var array =[]
        console.log(JSON.parse(JSON.stringify(arraylist))[0].user_booknumber)
        var received = JSON.parse(JSON.stringify(arraylist))[0].user_booknumber
            array = (JSON.parse(received))            
            array.push({user:userId,no:parseInt(ln)})
            input = (JSON.stringify(array))
      
       Booking.updatebooking(id,ln,input,function(err,result){
            if(err){
                console.log(err);
                return res.status(400).send('Error with booking try again')
            }
            if(result.affectedRows==0){
                return res.status(400).send('Error with booking try again')
               
            }else{
                return   res.json(result);  
            }
           
        })
    })
    
}
