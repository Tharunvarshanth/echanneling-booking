import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/widgets/text_field_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:form_validator/form_validator.dart';

class RoundedInputField extends StatefulWidget{
  final String hintText;
  final IconData icon;
  final ValueChanged<String> onChanged;
  final String validation;
  final TextEditingController controller;

  const RoundedInputField({
    Key key,
    this.hintText,
    this.icon,
    this.onChanged,
    this.validation,
    this.controller
  }):super(key:key);


  @override
  _RoundedInputField createState() => _RoundedInputField();

}
class _RoundedInputField extends State<RoundedInputField>{
  final email = ValidationBuilder().email().maxLength(50).build();
  final mobilephonenumber  = ValidationBuilder().phone().maxLength(10).build();
  final validatorname = ValidationBuilder().name().build();

  var v;
  @override
  Widget build(BuildContext context) {
    if(widget.validation=="email"){
      v = email ;
    }
    else if(widget.validation=="mobilephonenumber"){
      v = mobilephonenumber;
    }
    else if(widget.validation=="name"){
      v = validatorname;
    }


    return TextFieldContainer(
      child: TextFormField(
            onChanged: widget.onChanged,
            controller: widget.controller,
            decoration: InputDecoration(
            hintText: widget.hintText,
            icon:Icon(widget.icon,color:kPrimaryColor),
            border:InputBorder.none,
          ),
           validator: this.v,
      ),
    );
  }

}


extension CustomValidationBuilder on ValidationBuilder {
  name() => add((value) {
    if (value == '') {
      return 'name should not empty';
    }
    return null;
  });
}


