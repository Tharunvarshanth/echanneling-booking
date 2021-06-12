var dbconnection = require('../../server')

var Booking = function(booking){
    this.Id = booking.Id;
    this.lastnumber = booking.lastnumber;
    this.schedule_Id = booking.schedule_Id;
    this.schedule_timeanddate_index = 	booking.schedule_timeanddate_index;
    this.user_booknumber = booking.user_booknumber;
}


Booking.getLastID = function(result){
 
    dbconnection.query("SELECT Id FROM booking ORDER BY Id DESC  LIMIT 1",function(err,res){
        if(err){
            result(err,null)           
        }
       
        result(null,res)
    })
}

Booking.createIinitialbooking = function(newbooking,result){
    console.log(newbooking.user_booknumber)
    dbconnection.query("INSERT INTO booking SET ?",newbooking,function(err,res){
        if(err){
            result(err,null)
        }
        
        result(null,res)
    })
}

Booking.alreadybookingIdavailable = function(bookid,result){
    dbconnection.query(`SELECT Id FROM  booking WHERE Id ='${bookid}'`,function(err,res){
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}

Booking.updatebooking = function(id,ln,list,result){
    dbconnection.query(`UPDATE booking SET lastnumber='${ln}', user_booknumber='${list}'
                    WHERE  Id='${id}' `,function(err,res){

                        if(err){
                            console.log("err booking",err)
                            result(err,null)
                        }
                       
                        result(null,res)
                    })
}

Booking.getbookinguserList= function(id1,result){
    dbconnection.query(`SELECT user_booknumber FROM booking WHERE Id='${id1}'`,function(err,res){
        if(err){
            console.log("err booking",err)
            result(err,null)
        }
       
        result(null,res)
    })
}

Booking.getbookingInfoBy_ScheduleId_and_Scheduletimeanddateindex = function(id1,id2,result){
    dbconnection.query(`SELECT * FROM booking WHERE schedule_Id='${id1}' AND schedule_timeanddate_index='${id2}'`,function(err,res){
        if(err){
            result(err,null)
        }
        result(null,res)
    })
}


module.exports = Booking