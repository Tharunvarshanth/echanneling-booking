


import 'package:ehannelling_mobileapp/models/doctor.dart';
import 'package:ehannelling_mobileapp/routes/GridView/doctor_grid.dart';
import 'package:ehannelling_mobileapp/routes/schedule/schedule_page.dart';
import 'package:ehannelling_mobileapp/services/categorylistservice.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HorizontalViewDoctor extends StatefulWidget{
  final double height;
  final Future<List<Doctor>> doctorIdandName;
  const HorizontalViewDoctor(this.height,this.doctorIdandName );

  @override
  _HorizontalViewDoctorState createState() => _HorizontalViewDoctorState();


}

class _HorizontalViewDoctorState extends State<HorizontalViewDoctor>{

  var categorylistservice = new CategoryListService();


  void initState(){
    super.initState();


  }



  @override
  Widget build(BuildContext context) {
    return  SliverList(
        delegate: SliverChildListDelegate(
            [
        Tooltip(
                message: 'Click Here Grid View',
                margin: EdgeInsets.symmetric(vertical: 5,horizontal: 25),
                decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25),
                gradient:
               const LinearGradient(colors: <Color>[Colors.amber, Colors.red]),
                ),
          child:              GestureDetector(
                  onTap: (){
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DoctorGrid(),
                        ));

                  },
                  child:Text('Doctors',
                    style:TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  )
                  )
              ),
           height: 50,
          padding: const EdgeInsets.all(8.0),
          preferBelow: false,
          showDuration: const Duration(seconds: 2),
          waitDuration: const Duration(seconds: 1),
        ),
              Container(
                height: widget.height/8,
                child: FutureBuilder(
                    future: widget.doctorIdandName,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                            scrollDirection: Axis.horizontal,
                            shrinkWrap: true,
                            padding: const EdgeInsets.all(8),
                            itemCount: snapshot.data.length,
                            itemBuilder: (BuildContext context, int index) {
                              return GestureDetector(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              SchedulePage(id: snapshot.data[index].Id),
                                        ));
                                  },
                               child: Container(
                                  margin: EdgeInsets.only(right: 20),
                                  height: widget.height,
                                  width: 125,
                                  decoration: BoxDecoration(
                                     gradient: new LinearGradient(
                                         colors:[Colors.lightBlueAccent,Colors.deepPurpleAccent],
                                       begin:Alignment.center,
                                       end:new Alignment(1.0,2.0)
                                     ),
                                     borderRadius: BorderRadius.circular(24)

                                  ),
                                  child: Padding(
                                      padding: EdgeInsets.all(20),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: <Widget>[
                                          Text('${snapshot.data[index].Name}',
                                              style: TextStyle(fontSize: 16,
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.bold)
                                          )
                                        ],
                                      )
                                  )
                               )
                              );

                            }
                        );
                      }
                      else {
                        return CircularProgressIndicator();
                      }
                    }
                ),
              )
            ]
        )
    );

  }
}