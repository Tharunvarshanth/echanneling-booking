import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decode/jwt_decode.dart';
class SharedPreference{

  static const Key = "ehannelling_user";
  Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  final _storage = new FlutterSecureStorage();

  String checkPref;

  void storeToken(output)async{
     await _storage.write(key: Key, value: output["token"]);
  }

  getToken()async{

    return  await _storage.read(key: Key);
  }
  getUsername ()async{
    String token = await getToken();
    Map<String, dynamic> payload = Jwt.parseJwt(token);


    return payload["subject"];
  }

  bool isExpired(token){
    DateTime expiryDate = Jwt.getExpiryDate(token);


    // To check if token is expired
    bool isExpired = Jwt.isExpired(token);
    print(isExpired);
    return  isExpired;
    // Can be used for auth state
    if (!isExpired) {
      //   Token isn't expired
    } else {
      //   Token is expired
    }
  }

  removeToken()async{
    await _storage.delete(key: Key);
  }
/*
  getPrefIdUser() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();

      checkPref = sharedPreferences.getString(Key);
      if (checkPref == null) {
          print("navigate");
      } else {
        // Navigator.of(context).pushAndRemoveUntil(
        //     PageTransition(
        //         type: PageTransitionType.leftToRightWithFade,
        //         child: HomePage()),
        //     (Route<dynamic> route) => false);
      }
    }


  Future<String> getUserInfo() async{
    final SharedPreferences prefs = await _prefs;
    var user = prefs.getString(Key);
    if(user != null){
       print("t");
       return user;
    }else{
       print("f");
       return null;
    }

  }
*/
}