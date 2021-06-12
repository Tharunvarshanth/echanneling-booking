
import 'dart:convert';
import 'dart:ui'  as ui;
import 'package:ehannelling_mobileapp/models/scheduletime.dart';
import 'package:ehannelling_mobileapp/routes/Booking/booking_page.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:ehannelling_mobileapp/services/timescheduleservice.dart';
import 'package:ehannelling_mobileapp/widgets/custom_card_painter.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class SchedulePage extends StatefulWidget{
  final String id;
  const SchedulePage({this.id});
  @override
  _SchedulePageState createState() =>  _SchedulePageState();

}
class  _SchedulePageState extends  State<SchedulePage>{

var timescheduleservice = TimeScheduleService();
var fetchdata;
var share = new SharedPreference();
var  username ;

  void initState(){
     super.initState();

     if(widget.id.contains("hos")){
         fetchdata = timescheduleservice.getScheduleByHospital(widget.id);
     }else if(widget.id.contains("spe")){
       fetchdata = timescheduleservice.getScheduleBySpecialization(widget.id);
     }else{
       fetchdata  = timescheduleservice.getScheduleByDoctor(widget.id);
     }
     
  loadusername();
  }
void loadusername ()async{
  username =await share.getUsername();

}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        title: Text('Schedules'),
      ),
        body:FutureBuilder<List<ScheduleTime>>(
         future: fetchdata,
          builder:(context,snapshot){
           if(snapshot.hasError) print(snapshot.error);
           return snapshot.hasData
               ? ListView.builder(
               itemCount: snapshot.data.length,
               itemBuilder: (BuildContext context, int index) {
                 return Center(
                   child:Padding(
                     padding: const EdgeInsets.all(8),
                     child:Stack(
                       children:<Widget>[

                   Container(
                   decoration: BoxDecoration(
                     borderRadius: BorderRadius.circular(20.00),
                     gradient: LinearGradient(
                       colors: [Colors.lightBlue,Colors.blue],
                           begin: Alignment.topLeft,
                       end:Alignment.bottomRight
                     ),
                     boxShadow: [
                       BoxShadow(
                         color:Colors.lightBlueAccent,
                         blurRadius: 12,
                         offset: Offset(0,6)
                       )
                     ]
                   ),
                   child: Column(
                       mainAxisSize: MainAxisSize.min,
                       children: <Widget>[
                          ListTile(
                           leading: Icon(Icons.local_hospital),
                           title: Text(snapshot.data[index].HospitalName),
                         ),
                         ListTile(
                           leading: Icon(Icons.work),
                           title: Text(snapshot.data[index].Name),
                         ),
                         Column(
                           mainAxisAlignment: MainAxisAlignment.spaceBetween,

                           children:snapshot.data[index].TimeAndDate.asMap().entries.map(

                                 (e) => Row(
                               children: <Widget>[
                                 Text(
                                   e.value.day,
                                   style: const TextStyle(
                                       fontSize: 16.0,
                                       fontWeight: FontWeight.w500
                                   ),
                                   textAlign: TextAlign.center,
                                 ),
                                 SizedBox(width: 10,),
                                 Text(
                                   e.value.Time,
                                   style: const TextStyle(
                                       fontSize: 16.0,
                                       fontWeight: FontWeight.w500,

                                   ),
                                   textAlign: TextAlign.center,
                                 ),
                                 TextButton(
                                   child: const Text('BOOK NOW',
                                   style: TextStyle(
                                     color: Colors.white,
                                     fontSize: 20
                                   ),
                                   ),
                                   onPressed: () {
                                     Navigator.push(
                                       context,
                                       MaterialPageRoute(
                                         builder: (context) => BookingPage(schedule:snapshot.data[index],index:e.key,username:username, ),
                                       ),
                                     );
                                   },
                                 ),

                               ],
                             ),
                           )
                               .toList(),
                         ),
                         ]
                   )

                 ),
                               Positioned(
                                        right:0,
                                        bottom:0,
                                        top:0,
                                  child:CustomPaint(
                                      size: Size(100,150),
                                    painter: CustomCardPainter(80,Colors.lightBlue,Colors.blue),
                                    )
                                )
                          ]
                       )
                 )
                 );



               }
           ):CircularProgressIndicator();
          }
      )
    );
  }

}

