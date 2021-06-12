import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/routes/Profile/profile_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../routes.dart';

class CustomAppBar extends StatelessWidget with PreferredSizeWidget{
  @override
  Widget build(BuildContext context) {

    return AppBar(
       backgroundColor: Colors.blue[600],
      elevation: 0.0,
      actions: <Widget>[

      ],
    );
  }

  @override

  Size get preferredSize => Size.fromHeight(kToolbarHeight);
  
}