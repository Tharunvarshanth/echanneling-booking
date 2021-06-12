
import 'dart:convert';
import 'dart:ui' as ui;
import 'package:ehannelling_mobileapp/routes/schedule/schedule_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:ehannelling_mobileapp/services/categorylistservice.dart';
import 'package:flutter/cupertino.dart';

class HospitalGrid extends StatefulWidget{
  const HospitalGrid();
  @override
  _HospitalGridState createState() => _HospitalGridState();

}
class _HospitalGridState extends State<HospitalGrid>{

  var categorylistservice = new CategoryListService();

  Widget build(BuildContext context) {
    return FutureBuilder<List<Hospital>>(
      future: categorylistservice.getHospitalIdandName(http.Client()),
      builder: (context, snapshot) {
        if (snapshot.hasError) print(snapshot.error);

        return snapshot.hasData
            ? HospitalList(hospitals: snapshot.data)
            : Center(child: CircularProgressIndicator());

        // By default, show a loading spinner.
        return Text('Loading');
      },
    );

  }

}
class HospitalList extends StatelessWidget {
  final List<Hospital> hospitals;

  HospitalList({Key key, this.hospitals}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
        title: Text('Hospital List'),
    ),
         body: GridView.builder(
            primary: false,
            padding: const EdgeInsets.all(20),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                       crossAxisSpacing: 10, mainAxisSpacing: 10, crossAxisCount: 3
            ),
             itemCount: hospitals.length,
             itemBuilder: (context, index) {
              return GestureDetector(
                  onTap: (){
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => SchedulePage(id:hospitals[index].Id ),
                        ));

                  },
                child:Stack(
                    children:<Widget>[
                Container(
                 padding: const EdgeInsets.all(8),
                alignment: Alignment.center,
                 decoration: BoxDecoration(
                   borderRadius: BorderRadius.circular(8),
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
                  child: Text(hospitals[index].Name,
                   style:TextStyle(
                       color: Colors.white,
                       fontWeight: FontWeight.w600
                   ),
                   ),
                ),


              ]
               )
              );
      },
         )

    );
  }
}
