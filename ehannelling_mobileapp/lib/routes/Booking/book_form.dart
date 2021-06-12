import 'package:ehannelling_mobileapp/models/booking.dart';
import 'package:ehannelling_mobileapp/models/scheduletime.dart';
import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/services/bookingservice.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
class BookForm extends StatefulWidget{
   final User user;
   final ScheduleTime schedule;
   final int index;
   final Booking booking;


  const BookForm({Key key, this.user,this.schedule, this.index, this.booking}) : super(key: key);@override
  _BookFormState createState() => _BookFormState();

}

class _BookFormState extends State<BookForm>{
  final _formKey_book = GlobalKey<FormState>();
  bool isChecked = false;
  Future<Booking> futureBookingInfo;
  var bookingservice = BookingService();

  void initState(){
    super.initState();
    loaddata();
  }

  Future<void> loaddata() async {

    futureBookingInfo =  bookingservice.getbookedinfo(http.Client(),widget.schedule.Id,widget.index);
  }


  @override
  Widget build(BuildContext context) {
    Color getColor(Set<MaterialState> states) {
      const Set<MaterialState> interactiveStates = <MaterialState>{
        MaterialState.pressed,
        MaterialState.hovered,
        MaterialState.focused,
      };
      if (states.any(interactiveStates.contains)) {
        return Colors.blue;
      }
      return Colors.red;
    }
    return FutureBuilder<Booking>(
      future:futureBookingInfo ,
        builder: (context,AsyncSnapshot<Booking> snapshot) {

          if(snapshot.hasData){
                 return  Form(
          key: _formKey_book,
          child: Column(
          children: <Widget>[

          Row(
                children: <Widget>[
                Icon(
                    Icons.supervised_user_circle
                ),
               Text(widget.schedule.Name)
              ]
          ),
            Row(
                children: <Widget>[
                  Icon(
                      Icons.book
                  ),
                  Text((snapshot.data.lastnumber+1).toString())
                ]
            ),
            Row(
                children: <Widget>[
                  Icon(
                      Icons.supervised_user_circle
                  ),
                  Text(widget.user.Id)
                ]
            ),
          Row(
               children: <Widget>[
                  Icon(
                  Icons.work
                 ),
                 Text(widget.schedule.HospitalName)
               ]
          ),
          Row(
               children: <Widget>[
                Icon(
                  Icons.calendar_today_sharp
               ),
                Text(widget.schedule.TimeAndDate[widget.index].day)
              ]
          ),
          Row(
                children: <Widget>[
                Icon(
                  Icons.timer_rounded
                ),
               Text(widget.schedule.TimeAndDate[widget.index].Time)
               ]
          ),
          Row(
                 children: <Widget>[
                      Text(
                        ('Hi'),

                   ),
               Text(widget.schedule.TimeAndDate[widget.index].Time)
              ]
          ),
          Row(
              children: <Widget>[
                Icon(
                   Icons.format_list_numbered_rounded
                  ),
                  Text('Booking Number'),
                 Text(widget.schedule.Name)
                 ]
               ),
           Row(
                children: <Widget>[
              Text("do you agree with our condition"),
             Checkbox(
                    checkColor: Colors.lightBlue,
                  fillColor:
                 MaterialStateProperty.resolveWith(getColor),
                value: isChecked,
                   onChanged: (bool value) {
                   setState(() {
                    isChecked = value;
                  });
                   }
                  ),
                     Text(widget.schedule.TimeAndDate[widget.index].Time)
                    ]
                   ),
                    Row(
                     children: <Widget>[
                     RaisedButton(
                       child: Text('Book'),
                      onPressed: () {}
                     ),
                       Text(widget.schedule.TimeAndDate[widget.index].Time)
                    ]
                       ),
                  ]
              )

                 );
        }else{
            return CircularProgressIndicator();
          }
        }
    );
  }

}