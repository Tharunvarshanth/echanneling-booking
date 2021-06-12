



import 'dart:convert';
import 'dart:ui';

import 'package:ehannelling_mobileapp/config/styles.dart';
import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ehannelling_mobileapp/routes/Profile/components/body.dart';
class ProfilePage extends StatefulWidget{
   const ProfilePage();
  @override
  _ProfilePageState  createState() => _ProfilePageState();


}

class _ProfilePageState extends State<ProfilePage>{
  var share = new SharedPreference();

  void initState (){
    super.initState();

  }
  void logout(){
    share.removeToken();
    print("te");
  }




  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: SingleChildScrollView(
        child: ConstrainedBox(
           constraints:BoxConstraints(maxHeight:MediaQuery.of(context).size.height),
          child:Container(
            height:MediaQuery.of(context).size.height,
            width:double.infinity,
            color:Colors.lightBlueAccent,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(height: 100,),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Padding(
                      padding:const EdgeInsets.only(top:0.0,bottom:0.0,left:20.0,right:0.0),
                      child: Text('Profile',
                          style:TextStyle(fontSize: 25,fontWeight: FontWeight.bold)
                      ),
                    ),
                    Padding(
                      padding:const EdgeInsets.only(top:0.0,bottom:0.0,right:5),
                      child: FlatButton.icon(
                        padding: const EdgeInsets.symmetric(vertical: 5,horizontal: 20),
                        shape:RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30)
                        ),
                        icon:const Icon(
                            Icons.logout,
                            color:Colors.white
                        ),
                          label:Text(
                              'Logout',
                              style:Styles.buttonTextStyle
                          ),
                          onPressed: () { logout();  },

                          ),
                      ),

                  ],
                ) ,
                Expanded(
                  child: Container(
                      decoration: BoxDecoration(
                          color:Colors.white,
                        borderRadius: BorderRadius.only(topLeft: Radius.circular(35),topRight: Radius.circular(100))
                      ),
                      child:Column(
                        children: <Widget>[
                             Container(
                               height:MediaQuery.of(context).size.height/1.5,
                               width: MediaQuery.of(context).size.width,
                                 child:Body()
                             )
                        ],
                      )
                  ),
                )
              ],
            ),
          )
        ),
      )
     // Body()

    );
  }
  
}