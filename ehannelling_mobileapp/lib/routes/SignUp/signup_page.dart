import 'package:ehannelling_mobileapp/routes/SignUp/components/body.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SignupPage extends StatefulWidget{
  const SignupPage();
  @override
 _SignupPageState  createState()  => _SignupPageState();


}

class _SignupPageState extends State<SignupPage>{

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body:Body()
    );
  }



}