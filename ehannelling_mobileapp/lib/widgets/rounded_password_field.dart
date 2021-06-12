import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/widgets/text_field_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:form_validator/form_validator.dart';

class RoundedPasswordField extends StatefulWidget{
  final ValueChanged<String> onChanged;
  final TextEditingController controller;
  final String hintText;


  const RoundedPasswordField({
    Key key,
    this.onChanged,
    this.controller,
    this.hintText,
}):super(key: key);

  @override
  _RoundedPasswordFieldState createState()  => _RoundedPasswordFieldState();


}
class _RoundedPasswordFieldState extends State<RoundedPasswordField>{
  bool _obscureText = true;

  void _toggle() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return  TextFieldContainer(
        child:TextFormField(
          obscureText: _obscureText,
          onChanged: widget.onChanged,
          validator: validatorpassword,
          controller: widget.controller,
          decoration: InputDecoration(
              hintText: widget.hintText,
              icon:Icon(
                Icons.lock,
                color:kPrimaryColor,
              ),
              suffixIcon: IconButton(
                  icon: Icon(
                    _obscureText ? Icons.visibility:Icons.visibility_off
                  ),
                  onPressed: this._toggle,
                  color:kPrimaryColor
              ),
              border: InputBorder.none
          ),

        )
    );
  }


}
extension CustomValidationBuilder on ValidationBuilder {
  password() => add((value) {
    if (value == '') {
      return 'Password should not empty';
    }
    return null;
  });

  retypepassword() => add((value){
    if(value==''){
      return 'Password should not empty';
    }
    return null;
  });
}

final validatorpassword = ValidationBuilder().password().build();

