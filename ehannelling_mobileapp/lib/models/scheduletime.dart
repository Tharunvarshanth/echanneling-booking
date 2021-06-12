
import 'dart:convert';

import 'package:ehannelling_mobileapp/models/TimeAndDateReason.dart';

import 'TimeAndDateReason.dart';



class ScheduleTime{
   final int Id;
   final List<TimeAndDateReason> TimeAndDate;
   final String HospitalName;
   final String Name;
   final String Type;

   ScheduleTime({
     this.Id,
     this.TimeAndDate,
     this.HospitalName,
     this.Name,
     this.Type
});

  factory ScheduleTime.fromJson(Map<String,dynamic> json){

     return  ScheduleTime(
        Id: json["Id"] as int ,
        TimeAndDate:  parse(json["TimeAndDate"]),
       HospitalName: (json["HospitalName"]) as String,
       Name : json["Name"] as String,
       Type: json["Type"] as String
     );
  }
}

List<TimeAndDateReason> parse(String TimeAndDate){
  final parsed = jsonDecode(TimeAndDate).cast<Map<String,dynamic>>();
  return parsed.map<TimeAndDateReason>((json)=> TimeAndDateReason.fromJson(json)).toList();
}