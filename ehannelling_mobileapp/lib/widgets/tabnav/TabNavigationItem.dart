import 'package:ehannelling_mobileapp/routes/Profile/profile_page.dart';
import 'package:ehannelling_mobileapp/routes/category/category_page.dart';
import 'package:ehannelling_mobileapp/routes/Home/home_page.dart';
import 'package:ehannelling_mobileapp/routes/Login/login_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TabNavigationItem{
  final Widget page;
  final Widget title;
  final Icon icon;

  TabNavigationItem({
    @required this.page,
    @required this.title,
    @required this.icon,
  });

  static List<TabNavigationItem> get items => [
    TabNavigationItem(
      page: HomePage(),
      icon: Icon(Icons.home_filled),
      title: Text("Home"),
    ),
    TabNavigationItem(
      page: CategoryPage(),
      icon: Icon(Icons.category),
      title: Text("Category"),
    ),
    TabNavigationItem(
      page: ProfilePage(),
      icon: Icon(Icons.supervised_user_circle_outlined),
      title: Text("Profile"),
    ),

  ];
}
