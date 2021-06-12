
import 'package:flutter/cupertino.dart';

class Background extends StatefulWidget{
  final Widget child;
   const Background({
      Key key,
     @required this.child
}):super(key:key);

  @override
  _BackgroundState  createState() => _BackgroundState();

}

class _BackgroundState extends State<Background>{

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
       return Container(
           height: size.height,
           width: double.infinity,
           child:Stack(
             alignment: Alignment.center,
             children: <Widget>[
               Positioned(
                   top:25,
                   right: 10,
                   child:GestureDetector(
                     onTap:(){
                       Navigator.pop(context);
                     },
                     child: Image.asset("assets/icons/circled-left.png",
                         width: size.width * 0.1
                     ),
                   )
               ),
               Positioned(
                   top:0,
                   left:0,
                   child:Image.asset("assets/images/signup_top.png",
                       width: size.width * 0.35
                   )
               ),
               Positioned(
                   bottom:0,
                   right: 0,
                   child:Image.asset("assets/images/login_bottom.png",
                       width: size.width * 0.4
                   )
               ),

               widget.child
             ],
           )
       );
  }

}