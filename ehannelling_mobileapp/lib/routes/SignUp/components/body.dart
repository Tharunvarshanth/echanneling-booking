
import 'dart:ui';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/routes/SignUp/components/background.dart';
import 'package:ehannelling_mobileapp/routes/SignUp/components/form.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../../routes.dart';

class Body extends StatefulWidget{
  const Body();

  @override
  _BodyState createState() => _BodyState();

}

class _BodyState extends State<Body> {


  final _formKey_signup = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child:SingleChildScrollView(
       child:Column(
         mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text("SIGNUP",
           style:TextStyle(fontWeight: FontWeight.bold)
          ),
          SvgPicture.asset("assets/icons/signup.svg",
            height: size.height * 0.3
          ),
          SignupForm(),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text("Already have account ?",
                  style: TextStyle(color:kPrimaryColor)
              ),
              GestureDetector(
                onTap: (){
                  Navigator.of(context)?.pushNamed(
                      RouteGenerator.loginPage
                  );
                },
                child: Text(' Login',
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