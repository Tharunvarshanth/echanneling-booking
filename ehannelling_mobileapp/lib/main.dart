import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/routes.dart';
import 'package:ehannelling_mobileapp/routes/Login/login_page.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'dart:async';
import 'package:flutter_guards/flutter_guards.dart';
import 'package:ehannelling_mobileapp/widgets/tabnav/TabPage.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

StreamController<bool> authState = StreamController();

Future<void>  main() async{
  authState.add(false);
  WidgetsFlutterBinding.ensureInitialized();
  var  sp = new SharedPreference();
  String token =await sp.getToken();

  if(token==null) {
    authState.add(false);
  }
  else if(sp.isExpired(token)){
    sp.removeToken();
    authState.add(false);
  }
  else{
    authState.add(true);
  }
  runApp(MyApp());

}

class MyApp extends StatelessWidget {
  final preload = Future.delayed(Duration(seconds: 2));

  // This widget is the root of your application.


  @override
  Widget build(BuildContext context) {


      return MaterialApp(
          onGenerateTitle: (context) => 'Ehannelling',
          initialRoute: RouteGenerator.homePage,
          onGenerateRoute: RouteGenerator.generateRoute,
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
              primaryColor: kPrimaryColor,
              scaffoldBackgroundColor: Colors.white
          ),
          // loading guard to preload stuff before running the app (like firebase initialization)
          home: LoadingGuard(
            load:preload,
            loading: LoadingPage(),
            success: Scaffold(
              // once everything is loaded we use the auth guard to protect screens
              body: AuthGuard(
                authStream: authState.stream,
                signedIn: TabPage(),
                signedOut:LoginPage(),
              ),
            ),
          )
         // TabPage()

      );


    }
}
class Root extends StatelessWidget {
  static go(BuildContext ctx, Widget to) {
    Navigator.of(ctx).push(
      MaterialPageRoute(
        builder: (context) => to,
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        RaisedButton(
          onPressed: () => go(context, FutureGuardExample()),
          child: Text('Future Guard Example'),
        ),
        RaisedButton(
          onPressed: () => go(context, StreamGuardExample()),
          child: Text('Stream Guard Example'),
        ),
        RaisedButton(
          onPressed: () => authState.add(false),
          child: Text('Sign Out'),
        ),
      ],
    );
  }
}

class FutureGuardExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureGuard<bool>(
      future: Future.delayed(Duration(seconds: 2)).then((value) => true),
      onData: (data) => TabPage(),
      onLoad: () => LoadingPage(),
      onError: (e) => ErrorPage(),
    );
  }
}

class StreamGuardExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamGuard<bool>(
      stream: Stream.periodic(Duration(seconds: 2)).map((event) => true),
      onData: (data) => TabPage(),
      onLoad: () => LoadingPage(),
      onError: (e) => ErrorPage(),
    );
  }
}


class LoadingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('loading'),
      ),
    );
  }
}
class ErrorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Error'),
      ),
    );
  }
}
