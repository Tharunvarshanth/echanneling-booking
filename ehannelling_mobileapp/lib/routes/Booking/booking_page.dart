import 'dart:convert';

import 'package:ehannelling_mobileapp/models/TimeAndDateReason.dart';
import 'package:ehannelling_mobileapp/models/booking.dart';
import 'package:ehannelling_mobileapp/services/bookingservice.dart';
import 'package:http/http.dart' as http;
import 'package:ehannelling_mobileapp/models/doctor.dart';
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:ehannelling_mobileapp/models/scheduletime.dart';
import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/routes/Booking/book_form.dart';
import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/categorylistservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BookingPage extends StatefulWidget{
  final ScheduleTime schedule;
  final int index;
  final String username;

  const BookingPage({Key key, this.schedule, this.index, this.username }) : super(key: key);

  @override
  _BookingPageState  createState() => _BookingPageState();

}

class _BookingPageState extends State<BookingPage>{


  bool isChecked = false;
  Future<User> futureUserInfo;
  Future<Booking> futureBookingInfo;
  Future<User> user;
  var share = new SharedPreference();
  var auth = new AuthService();
  var bookingservice = BookingService();

  var categorylist = CategoryListService();
  Future<User> _post;

  
  void initState() {
    super.initState();
    //print(widget.schedule[widget.index].day);
    loaddata();
  }


  Future<void> loaddata() async {
      futureUserInfo =  auth.loadbyUsername();
      futureBookingInfo =  bookingservice.getbookedinfo(http.Client(),widget.schedule.Id,widget.index);
     }



  final Future<String> _calculation = Future<String>.delayed(
    const Duration(seconds: 2),
        () => 'Data Loaded',
  );

  @override
  Widget build(BuildContext context) {

    return Scaffold(
        appBar: AppBar(title:Text('Booking')),
        body: FutureBuilder<User>(
          future:futureUserInfo,
          builder: (context,AsyncSnapshot<User> snapshot) {

            if(snapshot.hasData) {
               return BookForm(user: snapshot.data,schedule: widget.schedule,index: widget.index);
          }
            else if(snapshot.hasError){
            return Column(
                children:<Widget>[
                   Icon(
                    Icons.error_outline,
                    color: Colors.red,
                    size: 60,
                   ),
                  Padding(
                    padding: const EdgeInsets.only(top: 16),
                   child: Text('Error: ${snapshot.error}'),
            )
            ]
             );
            }
            else{

               return   Center(
               child:  SizedBox(
                   child: CircularProgressIndicator(),
                   width: 60,
                  height: 60,
                 ),

                  );


            }

          }
        )
    );
  }

}