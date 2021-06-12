
import 'dart:ui';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/config/CONSTANT.dart';

import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/services/authservice.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import '../../../routes.dart';

class Profile extends StatefulWidget{
  final User user;

  const Profile({Key key, this.user}) : super(key: key);
  @override
  _ProfileState createState()  => _ProfileState();

}

class _ProfileState extends State<Profile>{
  var share = new SharedPreference();
  var auth = new AuthService();
  TextEditingController displayname;
  TextEditingController _mobile;
  TextEditingController _username;
  bool _circularprogress = false;
  bool _focustext = true;
  bool _validate = false;
  void initState(){
    super.initState();
   displayname = TextEditingController(text: widget.user.Displayname );
    _mobile = TextEditingController(text: widget.user.Mobile) ;
    _username = TextEditingController(text:widget.user.Username) ;
  }

  void _toggle() async {
    if (!_focustext) {
      if (   (displayname.text != null) && (_mobile.text != null) &&
          (_username.text != null)  ) {
        setState(() {
          _circularprogress = true;
        });
        var res = await auth.edituser(
            widget.user.Id, _username.text, displayname.text, _mobile.text);
        if (res.statusCode == 200) {
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text('Updated')));
          setState(() {
            _circularprogress = false;
          });
        }
        else {
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text('Not Updated')));
        }
        setState(() {
          _circularprogress = false;
        });
      }else {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("Text Field Cann't be null")));
      }
    }


    setState(() {
      _focustext = !_focustext;
    });
  }



  @override
  void dispose() {
    displayname.dispose();
    _mobile.dispose();
    _username.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {

    return
          Column(
           children: <Widget>[

             SizedBox(height:15),

              Row(
                children:<Widget>[
              !_circularprogress?IconButton(
                  icon: Icon(
                      _focustext ? Icons.edit:Icons.save_rounded
                  ),
                  tooltip:_focustext ?"Edit":"Save" ,
                  onPressed: this._toggle,
                  color:kPrimaryColor
              ):CircularProgressIndicator(),
                  _focustext ?  Text('Edit'):Text('Save')
            ]
              ),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  topRight:Radius.circular(15),
                ),
                color:  Color(0xFFB3E5FC),
                boxShadow: [BoxShadow(color:Colors.black12,blurRadius: 5.0)]
              ),
             child: TextField(
                readOnly: _focustext,
               controller: displayname,
                cursorColor: Colors.blue,
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                    labelText: "Display name",
                    hintText: widget.user.Displayname,
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    errorText: _validate?'Value Cannot Be null':null
                ),

              ),
            ),
            SizedBox(height: 20,),

             Container(
                  decoration: BoxDecoration(
                 borderRadius: BorderRadius.only(
                 topRight:Radius.circular(15),
                     ),
                     color:  Color(0xFFB3E5FC),
                       boxShadow: [BoxShadow(color:Colors.black12,blurRadius: 5.0)]
                        ),
            child: TextField(
               readOnly: _focustext,
               controller: _mobile,
              cursorColor: Colors.blue,
              textAlign: TextAlign.center,
               decoration:InputDecoration(
                   labelText: "Mobile",
                   hintText: widget.user.Mobile,
                   floatingLabelBehavior: FloatingLabelBehavior.always

               ),

             ),
             ),
             SizedBox(height: 20,),
               Container(
               decoration: BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topRight:Radius.circular(15),
                   ),
                    color:  Color(0xFFB3E5FC),
                    boxShadow: [BoxShadow(color:Colors.black12,blurRadius: 5.0)]
                      ),
                      child:    TextField(
                     cursorColor: Colors.blue,
                      textAlign: TextAlign.center,
                       readOnly: _focustext,
                          controller: _username,
                        decoration:InputDecoration(
                   labelText: "Username",
                   hintText: widget.user.Username,
                   floatingLabelBehavior: FloatingLabelBehavior.always
               ),
             ),
               ),
             SizedBox(height: 20,),
                 Container(
                     decoration: BoxDecoration(
                     borderRadius: BorderRadius.only(
                    topRight:Radius.circular(15),
                      ),
                     color:  Color(0xFFB3E5FC),
                     boxShadow: [BoxShadow(color:Colors.black12,blurRadius: 5.0)]
                      ),
                       child:    TextField(
                       readOnly: true,
                         cursorColor: Colors.blue,
                         textAlign: TextAlign.center,
                           decoration:InputDecoration(
                     labelText: "Role",
                     hintText: widget.user.Role,
                     floatingLabelBehavior: FloatingLabelBehavior.always
                 ),

             )
                 ),
               ]
            );




  }

}