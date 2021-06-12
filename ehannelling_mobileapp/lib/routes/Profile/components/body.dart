
import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/routes/Profile/components/profile.dart';
import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';



class Body extends StatefulWidget{
  final User userinfo;

  const Body({Key key, this.userinfo}) : super(key: key);
  @override
  _BodyState  createState() => _BodyState();

}

class _BodyState extends State<Body> with TickerProviderStateMixin{
var share = new SharedPreference();
var auth = new AuthService();
Future<User> futureUserInfo;

AnimationController controller;

 void initState(){
   super.initState();

   controller = AnimationController(
     vsync: this,
     duration: const Duration(seconds: 5),
   )..addListener(() {
     setState(() {});
   });

   controller.repeat(reverse: true);
   loaddata();
 }

 void loaddata ()async{



  futureUserInfo = auth.loadbyUsername();
  print(futureUserInfo);
 }



  @override
  Widget build(BuildContext context) {

    return Scaffold(
        body:Padding(
          padding:EdgeInsets.all(25),
           child:FutureBuilder<User>(
                future: futureUserInfo,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Profile(user:snapshot.data);
                  } else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }else {
                    // By default, show a loading spinner.
                    return Center(child: CircularProgressIndicator(value: controller.value,));
                  }
                },
              )

    )
        );

  }


}