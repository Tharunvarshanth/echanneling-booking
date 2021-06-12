import 'dart:convert';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/models/scheduletime.dart';
import 'package:http/http.dart' as http;


class TimeScheduleService{


  List<ScheduleTime> parseSchedule(String responsebody){
    final parsed = jsonDecode(responsebody).cast<Map<String,dynamic>>();
    return parsed.map<ScheduleTime>((json)=> ScheduleTime.fromJson(json)).toList();
  }

  Future<List<ScheduleTime>> getScheduleByHospital(String id) async{
     String url = formater('ts/getbyHospitalId');
     url = url+"?Hid="+id;
     var response = await http.get(url,
       headers: {"Authorization": "x-access-token "},
     );
     return  parseSchedule(response.body);
  }




  Future<List<ScheduleTime>> getScheduleByDoctor(String id) async{
    String url = formater('ts/getbyDoctorId');
    url = url+"?Did="+id;
    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );
    return parseSchedule(response.body);
  }



  Future<List<ScheduleTime>> getScheduleBySpecialization(String id) async{
    String url = formater('ts/getbySpecializationId');
    url = url+"?Sid="+id;
    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );

    return parseSchedule(response.body);
  }
}