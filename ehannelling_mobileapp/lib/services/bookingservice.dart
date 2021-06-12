import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/models/booking.dart';

class BookingService{
/*
  Booking parseBooking(String responseBody){
    print("nj"+responseBody);

    final parsed = jsonDecode(responseBody).cast<Map<String,dynamic>>();
    return parsed.map<Booking>((json) => Booking.fromJson(json));
  }*/

  Future<Booking> getbookedinfo(http.Client client,sid,index) async{
     String url = formater('booking/getbookinginfo?schedule_Id=${sid}&&ttindex=${index}');
     var response  = await client.get(url, headers: {"Authorization": "x-access-token "});
     if(response.statusCode==200){
       return Booking.fromJson(jsonDecode(response.body));
     }
     else {
       throw Exception('Failed to load album');
     }
   //  r
  }

  Future<http.Response> getbookedinfo_nonjson(http.Client client,sid,index)async{
    String url = formater('booking/getbookinginfo?schedule_Id=${sid}&&ttindex=${index}');
    var response  = await client.get(url, headers: {"Authorization": "x-access-token "});

    return (response);
  }

  Future<http.Response> bookappointment(Booking booking)async{
     String url = formater('booking/book');
     var response = await http.post(url,headers: {"Authorization": "x-access-token "},body:booking);
     return response;
  }

}