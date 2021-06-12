
class TimeAndDateReason{
 final String day;
 final String Time;
 final bool active;
 final String reason;

 TimeAndDateReason({
   this.day,
   this.Time,
   this.active,
   this.reason
 });

 factory TimeAndDateReason.fromJson(Map<String,dynamic> json){

   return  TimeAndDateReason(
       day: json["day"] as String ,
       Time: json["Time"] as String ,
       active: json["active"] as bool,
       reason : json["reason"] as String,

   );
 }

}

