
import 'package:ehannelling_mobileapp/config/styles.dart';
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:ehannelling_mobileapp/routes/Home/components/horizontalview_doctor.dart';
import 'package:ehannelling_mobileapp/routes/Home/components/horizontalview_hospital.dart';
import 'package:ehannelling_mobileapp/routes/Home/components/horizontalview_specialization.dart';
import 'package:ehannelling_mobileapp/routes/Profile/profile_page.dart';

import 'package:ehannelling_mobileapp/services/categorylistservice.dart';

import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:ehannelling_mobileapp/widgets/custom_app_bar.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import '../../routes.dart';

class HomePage extends StatefulWidget{
  const HomePage();

  @override
  _HomePageState createState() => _HomePageState();



}

class _HomePageState extends State<HomePage> {
  var categorylistservice = new CategoryListService();
  //Future<List<Hospital>> futureHospitalList;*/
  final List<int> colorCodes = <int>[600, 500, 100];

  void initState(){
    super.initState();
    //futureHospitalList = cLS.getHospitalIdandName();
  }

  @override
  Widget build(BuildContext context) {
    Size size  = MediaQuery.of(context).size;
    return
        Scaffold(
            appBar: CustomAppBar(),
        body:
        CustomScrollView(
            slivers: <Widget>[
            _buildHeader(size.height,context), 
              HorizontalViewHospital(size.height,categorylistservice.getHospitalIdandName(http.Client())),
              HorizontalViewDoctor(size.height,categorylistservice.getDoctorIdandName(http.Client())),
              HorizontalViewSpecialization(size.height,categorylistservice.getSpecificationIdandName(http.Client()))

          ]
        )
        );







  }



}

SliverToBoxAdapter _buildHeader(double screenHeight,BuildContext context){
  String _number = '+940768407950'; //set the number here

  return SliverToBoxAdapter(
      child:Container(
          padding:const EdgeInsets.all(20),
          decoration: BoxDecoration(
              color:Colors.blue[600],
              borderRadius: BorderRadius.only(bottomLeft: Radius.circular(40),bottomRight: Radius.circular(40))
          ),
          child:Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[

                  Image(
                       image:AssetImage("assets/icons/icons8-hospital-100.png"),
                      ),
                  Text(
                      'ECHANNLLING',
                      style:const TextStyle(
                          color:Colors.white,
                          fontSize: 25,
                          fontWeight: FontWeight.bold
                      )
                  )
                ],
              ),
              SizedBox(height: screenHeight *0.03,),
              Column(
                children: <Widget>[
                  Text('Are you feeling sick?',
                      style:const TextStyle(
                          color:Colors.white,
                          fontSize: 22.0,
                          fontWeight: FontWeight.bold
                      )
                  ),
                  SizedBox(height:screenHeight * 0.02),
                  Text('If you feel to meet specialist book now',
                      style:const TextStyle(
                          color:Colors.white70,
                          fontSize: 16.0,
                          fontWeight: FontWeight.bold
                      )
                  ),
                  SizedBox(height: screenHeight *0.03,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      FlatButton.icon(
                          padding: const EdgeInsets.symmetric(vertical: 5,horizontal: 20),
                          onPressed:_callNumber,
                          color:Colors.red,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30)
                          ),
                          icon:const Icon(
                              Icons.phone,
                              color:Colors.white
                          ),
                          label:Text(
                            'Call Now',
                            style:Styles.buttonTextStyle,

                          )
                      ),
                      FlatButton.icon(
                          padding: const EdgeInsets.symmetric(vertical: 5,horizontal: 20),
                          onPressed: (){},
                          color:Colors.green,
                          shape:RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30)
                          ),
                          icon:const Icon(
                              Icons.alternate_email,
                              color:Colors.white
                          ),
                          label:Text(
                              'test@hotmail.com',
                              style:Styles.buttonTextStyle
                          )
                      )
                    ],
                  )
                ],
              )
            ],
          )
      )
  );
}
_callNumber() async{
  const number = '08592119XXXX'; //set the number here
  bool res = await FlutterPhoneDirectCaller.callNumber(number);
}
