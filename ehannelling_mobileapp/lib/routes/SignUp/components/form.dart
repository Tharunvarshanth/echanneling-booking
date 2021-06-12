import 'dart:convert';

import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_button.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_input_field.dart';
import 'package:ehannelling_mobileapp/widgets/rounded_password_field.dart';
import 'package:ehannelling_mobileapp/widgets/tabnav/TabPage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:form_validator/form_validator.dart';

import '../../../main.dart';
import '../../../routes.dart';

class SignupForm extends StatefulWidget{

  @override
  _SignupFormState createState() => _SignupFormState();

}
class _SignupFormState extends State<SignupForm>{

  final emailController = TextEditingController();
  final passwController = TextEditingController();
  final mobileController = TextEditingController();
  final nameController = TextEditingController();
  final retypepasscontroller = TextEditingController();
  var  sp = new SharedPreference();
  AuthService authService =  AuthService();
  bool _circularprogress = false;

  void onSubmit()async{
    setState(() {
      _circularprogress = true;
    });
    var res = await authService.register(emailController.text,passwController.text,nameController.text,mobileController.text);

    if(res.statusCode==200){
      setState(() {
        _circularprogress = false;
      });
      Map<String, dynamic> output = json.decode(res.body);
      print(output["token"]);

      var save = await sp.storeToken(output);
      Navigator.of(context)?.pushNamed(
          RouteGenerator.dashboardPage
      );

    }else{
      setState(() {
        _circularprogress = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Account Already taken')));
    }
  }

  @override
  void dispose() {
    emailController.dispose();
    passwController.dispose();
    mobileController.dispose();
    nameController.dispose();
    retypepasscontroller.dispose();
    super.dispose();
  }

  final _formKey_signup = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Form(
        key:_formKey_signup,
        child:Column(
          children: <Widget>[
            RoundedInputField(
              hintText: "Your Email",
              icon: Icons.email,
              onChanged: (value){},
              validation: "email",
              controller: emailController,
            ),
            RoundedInputField(
              hintText: "Your Name",
              icon: Icons.supervised_user_circle,
              onChanged: (value){},
              validation: "name",
              controller: nameController,
            ),
            RoundedInputField(
              hintText: "Your Mobile",
              icon: Icons.phone,
              onChanged: (value){},
              validation: "mobilephonenumber",
              controller: mobileController,
            ),
            RoundedPasswordField(
              onChanged: (value){},
              controller: passwController,
              hintText: 'Password',

            ),

            SizedBox(height: size.height * 0.03),
           (_circularprogress
            ?CircularProgressIndicator()
            :RoundedButton(
              text:'SIGNUP',
              press:() async{
                if (_formKey_signup.currentState.validate()) {
                  ScaffoldMessenger.of(context)
                      .showSnackBar(SnackBar(content: Text('Processing Data')));
                    setState(() {
                     _circularprogress = true;
                       });
                    var res = await authService.register(emailController.text,passwController.text,nameController.text,mobileController.text);

                   if(res.statusCode==200){
                         setState(() {
                      _circularprogress = false;
                        });
                  Map<String, dynamic> output = json.decode(res.body);
                    print(output["token"]);

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
                         .showSnackBar(SnackBar(content: Text('Account Already taken')));
                         }

                }
              },
            )
           )
          ],
        )
    );
  }



}

