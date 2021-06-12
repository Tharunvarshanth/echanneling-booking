import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/widgets/tabnav/TabNavigationItem.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TabPage extends StatefulWidget{
  const TabPage();

  @override
  _TabPageState createState() => _TabPageState();
}

class _TabPageState extends State<TabPage> {
  int _selectedIndex = 0;

  void _onItemTapped(int index){
    setState(() {
      _selectedIndex = index;
    });
    print(_selectedIndex);
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      body:IndexedStack(
        index: _selectedIndex,
        children: [
          for(final tabItem in TabNavigationItem.items) tabItem.page
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.white,
      showUnselectedLabels: false,
      unselectedItemColor: Colors.black87,
      backgroundColor: kPrimaryColor1,
      onTap: _onItemTapped,
      elevation: 0.0,
       items:[
          for(final tabItem in TabNavigationItem.items)
            BottomNavigationBarItem(
              icon: Container(
                padding: const EdgeInsets.symmetric(
                  vertical: 16,horizontal: 16
                ),
                decoration: BoxDecoration(
                  color:Colors.blue[600],
                  borderRadius: BorderRadius.circular(20),
                ),
                child:(tabItem.icon)
              ),
              title: tabItem.title,
            ),
       ],

    ),
    );
  }
}