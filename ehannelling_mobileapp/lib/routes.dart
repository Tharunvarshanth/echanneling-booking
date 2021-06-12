import 'package:ehannelling_mobileapp/routes/GridView/doctor_grid.dart';
import 'package:ehannelling_mobileapp/routes/GridView/hospital_grid.dart';
import 'package:ehannelling_mobileapp/routes/GridView/specialization_grid.dart';
import 'package:ehannelling_mobileapp/routes/Home/home_page.dart';
import 'package:ehannelling_mobileapp/routes/Login/login_page.dart';
import 'package:ehannelling_mobileapp/routes/Profile/profile_page.dart';
import 'package:ehannelling_mobileapp/routes/SignUp/signup_page.dart';
import 'package:ehannelling_mobileapp/routes/schedule/schedule_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class RouteGenerator{

  static const String homePage = "/";
  static const String loginPage = "/login";
  static const String signupPage = "/signup";
  static const String bookingPage = "/book";
  static const String dashboardPage = "/dashboard";
  static const String profilePage = "/profile";
  static const String scheduleviewPage = "/schedule";
  static const String doctorPage = "/doctorlist";
  static const String hospitalPage = "/hospiallist";
  static const String specializationPage = "/specialization";

  RouteGenerator._(){}

  static Route<dynamic> generateRoute(RouteSettings settings){
    switch (settings.name) {
      case homePage:
        return MaterialPageRoute(
          builder: (_) => const HomePage(),
        );
      case loginPage:
        return MaterialPageRoute(
          builder: (_) => const LoginPage(),
        );
      case signupPage:
        return MaterialPageRoute(
          builder: (_) => const SignupPage(),
        );
      case specializationPage  :
        return MaterialPageRoute(
          builder: (_) => const SpecializationGrid(),
        );
      case doctorPage:
        return MaterialPageRoute(
          builder: (_) => const DoctorGrid(),
        );
      case hospitalPage:
        return MaterialPageRoute(
          builder: (_) => const HospitalGrid(),
        );
      case specializationPage:
        return MaterialPageRoute(
          builder: (_) => const SpecializationGrid(),
        );
      case bookingPage:
        return MaterialPageRoute(
           // builder: (_)=>const BookignPage(),
        );
      case dashboardPage:
        return MaterialPageRoute(
          //  builder: (_) => const DashBoardPage(),
        );
      case scheduleviewPage:
        return MaterialPageRoute(
          builder: (_) => const SchedulePage(),
        );
      case profilePage:
        return MaterialPageRoute(
          builder: (_) => const ProfilePage(),
        );

      default:
        throw FormatException("Route not found");
    }
  }
}

class RouteException implements Exception{
  final String message;
  const RouteException(this.message);
}