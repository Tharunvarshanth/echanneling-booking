
import 'dart:convert';

import 'package:ehannelling_mobileapp/models/userbooknumber.dart';

class Booking{
  final String Id;
  final int lastnumber;
  final int schedule_Id;
  final int schedule_timeanddate_index;
  final List<UserBookNumber> user_booknumber;

  Booking({this.Id, this.lastnumber, this.schedule_Id, this.schedule_timeanddate_index,this.user_booknumber});

  factory Booking.fromJson(Map<String,dynamic> json){
    print(json);
    return Booking(
      Id: json["Id"] as String,
      lastnumber : json["lastnumber"] as int,
      schedule_Id : json["schedule_Id"] as int,
      schedule_timeanddate_index : json["schedule_timeanddate"] as int,
      user_booknumber : parseUserBookNumber(json["user_booknumber"])
    );
  }

}
List<UserBookNumber> parseUserBookNumber(String responseBody){
  final parsed = jsonDecode(responseBody).cast<Map<String,dynamic>>();
  return parsed.map<UserBookNumber>((json) => UserBookNumber.fromJson(json)).toList();
}