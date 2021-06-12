
import 'dart:convert';
import 'package:ehannelling_mobileapp/models/Specialization.dart';
import 'package:ehannelling_mobileapp/routes/schedule/schedule_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:ehannelling_mobileapp/services/categorylistservice.dart';
import 'package:flutter/cupertino.dart';

class SpecializationGrid extends StatefulWidget{
  const SpecializationGrid();
  @override
  _SpecializationGridState createState() => _SpecializationGridState();

}
class _SpecializationGridState extends State<SpecializationGrid>{

  var categorylistservice = new CategoryListService();

  Widget build(BuildContext context) {
    return FutureBuilder<List<Specialization>>(
      future: categorylistservice.getSpecificationIdandName(http.Client()),
      builder: (context, snapshot) {
        if (snapshot.hasError) print(snapshot.error);

        return snapshot.hasData
            ? SpecializationList(specializations: snapshot.data)
            : Center(child: CircularProgressIndicator());

        // By default, show a loading spinner.
        return Text('Loading');
      },
    );

  }

}
class SpecializationList extends StatefulWidget {
  final List<Specialization> specializations;

  SpecializationList({Key key, this.specializations}) : super(key: key);

  @override
  _SpecializationListState createState() => _SpecializationListState();
}
class _SpecializationListState extends State<SpecializationList>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
        title: Text('Specialization List'),
    ),
      body: GridView.builder(
        primary: false,
        padding: const EdgeInsets.all(20),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisSpacing: 10, mainAxisSpacing: 10, crossAxisCount: 3
          ),
        itemCount: widget.specializations.length,
        itemBuilder: (context, index) {
               return GestureDetector(
                   onTap: () {
                     Navigator.push(
                         context,
                         MaterialPageRoute(
                           builder: (context) =>
                               SchedulePage(id: widget.specializations[index].Id),
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
                           child: Text(widget.specializations[index].Type,
                             style: TextStyle(
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