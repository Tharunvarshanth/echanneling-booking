
import 'dart:convert';
import 'package:ehannelling_mobileapp/models/doctor.dart';
import 'package:ehannelling_mobileapp/routes/schedule/schedule_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:ehannelling_mobileapp/services/categorylistservice.dart';
import 'package:flutter/cupertino.dart';

class DoctorGrid extends StatefulWidget{
const DoctorGrid();
  @override
  _DoctorGridState createState() => _DoctorGridState();

}
class _DoctorGridState extends State<DoctorGrid>{

  var categorylistservice = new CategoryListService();

  Widget build(BuildContext context) {
    return FutureBuilder<List<Doctor>>(
      future: categorylistservice.getDoctorIdandName(http.Client()),
      builder: (context, snapshot) {
        if (snapshot.hasError) print(snapshot.error);

        return snapshot.hasData
            ? DoctorList(doctors: snapshot.data)
            : Center(child: CircularProgressIndicator());

        // By default, show a loading spinner.
        return Text('Loading');
      },
    );

  }

}

class DoctorList extends StatefulWidget {
  final List<Doctor> doctors;

  DoctorList({Key key, this.doctors}) : super(key: key);

  @override
  _DoctorListState createState() => _DoctorListState();
}
class _DoctorListState extends  State<DoctorList>{


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Doctors List'),
        ),
        body: GridView.builder(
            primary: false,
            padding: const EdgeInsets.all(20),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisSpacing: 10, mainAxisSpacing: 10, crossAxisCount: 3
            ),
            itemCount: widget.doctors.length,
            itemBuilder: (context, index) {
              return GestureDetector(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              SchedulePage(id: widget.doctors[index].Id),
                        ));
                  },
                  child: Stack(
                      children: <Widget>[
                        Container(
                          padding: const EdgeInsets.all(8),
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              gradient: LinearGradient(
                                  colors: [Colors.lightBlue, Colors.blue],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight
                              ),
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.lightBlueAccent,
                                    blurRadius: 12,
                                    offset: Offset(0, 6)
                                )
                              ]
                          ),
                          child: Text(widget.doctors[index].Name,
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w600
                            ),
                          ),
                        ),

                      ]
                  )
              );

            }
        )
    );
  }


}