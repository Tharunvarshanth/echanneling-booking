
import 'dart:async';
import 'dart:convert';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_button.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_input_field.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_password_field.dart';
import 'package:ehannelling_mobileapp/widgets/tabnav/TabPage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:form_validator/form_validator.dart';

import '../../../routes.dart';

StreamController<bool> authState = StreamController();
class LoginForm extends StatefulWidget {

  @override
  _LoginFormState createState()  => _LoginFormState();


}
class _LoginFormState extends State<LoginForm>{

  final emailController = TextEditingController();
  final passwController = TextEditingController();

  var  sp = new SharedPreference();
  AuthService authService =  AuthService();
  bool _circularprogress = false;


  @override
  void dispose() {
    emailController.dispose();
    passwController.dispose();
    super.dispose();
  }



  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Form(
        key: _formKey,
        autovalidate: true,
        child: Column(
          children: <Widget>[
            RoundedInputField(
              controller:emailController,
              hintText:"Your Username",
              icon:Icons.email,
              validation: "email",
            ),
            SizedBox(height: size.height * 0.03),
            RoundedPasswordField(
              controller:passwController,
              hintText: 'Password',

            ),
            SizedBox(height: size.height * 0.03),
            (_circularprogress
                ?CircularProgressIndicator()
            :RoundedButton(
              text:'Login',
              press: ()async{
                ScaffoldMessenger.of(context)
                    .showSnackBar(SnackBar(content: Text('Please Wait')));
                if (_formKey.currentState.validate()) {
                  setState(() {
                    _circularprogress = true;
                  });
                  var res = await authService.login(emailController.text, passwController.text);
                  if(res.statusCode==200){
                    setState(() {
                      _circularprogress = false;
                    });
                    Map<String, dynamic> output = json.decode(res.body);
                    var save = await sp.storeToken(output);
                    authState.add(true);
                    Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) =>TabPage(),
                        ),
                    );
                  }else{
                    setState(() {
                      _circularprogress = false;
                    });
                    ScaffoldMessenger.of(context)
                        .showSnackBar(SnackBar(content: Text('Error with your password / mail')));
                  }


                }
              },
              color:kPrimaryColor,
              textColor: Colors.white,
            )

            ),
          ],
        )
    );

  }

}

