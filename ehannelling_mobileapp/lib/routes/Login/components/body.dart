

import 'dart:ui';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/routes.dart';
import 'package:ehannelling_mobileapp/routes/Login/components/background.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_button.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_input_field.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_password_field.dart';
import 'package:ehannelling_mobileapp/widgets/text_field_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:form_validator/form_validator.dart';

import '../../../main.dart';
import 'form.dart';

class Body extends StatefulWidget{
  const Body({
    Key key,
  }) : super(key: key);

  @override
  _BodyState createState() => _BodyState();

}

class _BodyState extends State<Body>{


  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
   return Background(
     child:SingleChildScrollView(
        child:Column(
         mainAxisAlignment: MainAxisAlignment.center,
         children:<Widget> [
         Text(
             "LOGIN",
           style:TextStyle(fontWeight: FontWeight.bold)
         ),
         SvgPicture.asset("assets/icons/login.svg",
           height: size.height * 0.35 ,
         ),
         LoginForm(),



         Row(
           mainAxisAlignment: MainAxisAlignment.center,
           children: [
             Text("Don't have account ?",
                  style: TextStyle(color:kPrimaryColor)
             ),
             GestureDetector(
               onTap: (){
                  Navigator.of(context)?.pushNamed(
                    RouteGenerator.signupPage
                  );
               },
               child: Text(' Sign Up',
                style: TextStyle(color:kPrimaryColor,fontWeight: FontWeight.bold)
               ),
             )
           ],
         )
       ],
     )
     )
   );

  }
}
