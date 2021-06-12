
import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:flutter/cupertino.dart';

class TextFieldContainer extends StatefulWidget{
  final Widget child;
  const TextFieldContainer({
    Key key,
    this.child,
  }):super(key:key);


  @override
  _TextFieldContainer createState() => _TextFieldContainer();

}
class _TextFieldContainer extends State<TextFieldContainer>{

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
        margin:EdgeInsets.symmetric(horizontal: 20,vertical: 5),
        padding: EdgeInsets.symmetric(horizontal: 20,vertical:5 ) ,
        width: size.width * 0.8,
        decoration: BoxDecoration(
            color:kPrimaryColor1,
            borderRadius:  BorderRadius.circular(29)
        ),
        child:widget.child
    );
  }

}
