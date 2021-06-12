

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/routes/Login/components/form.dart';
import 'package:ehannelling_mobileapp/widgets/tabnav/TabPage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'components/body.dart';

class LoginPage extends StatefulWidget {
  const LoginPage();

  @override
  _LoginPageState createState() => _LoginPageState();


}

class _LoginPageState extends State<LoginPage>{

  @override
  Widget build(BuildContext context) {

    return Scaffold(
       body:Body()
    );
  }



}