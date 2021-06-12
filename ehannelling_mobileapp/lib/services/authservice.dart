

import 'dart:convert';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/models/user.dart';
import 'package:ehannelling_mobileapp/services/shared_preference.dart';
import 'package:http/http.dart' as http;


class AuthService {

  var share = SharedPreference();


   Future<http.Response> login(username,password) async{
     print(password);
     String url = formater('user/login');
     Map<String, String> data = {
       "Username": username,
       "Password": password,
     };

     var response = await http.post(
       url,
       body: (data),
     );
     return (response);
   }
   
   Future<http.Response> edituser(String Id,String username,String displayname,String mobile)async{
       String url = formater('user/useredit');
       Map<String,String> data ={
         "Id":Id,
         "Username":username,
         "Displayname":displayname,
         "Mobile":mobile
       };
       var response  = await http.post(
         url,
         body:data
       );
       return response;
   } 

   Future<http.Response> register(username,password,name,mobilenumber ) async{
     String url = formater('user/register');
     Map<String,String> data = {
       "Username":username,
       "Password":password,
       "Displayname":name,
       "Mobile":mobilenumber,
       "Role":"user"
     };
     var response  = await http.post(
       url,
       body:(data)
     );
     return (response);
   }


   Future<User> loadbyUsername() async{
       var _username =await   share.getUsername();

     String url = formater('user/userinfo?username='+_username);
     var response = await http.get(
       url,
       headers: {"Authorization": "x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoidGhhcnVudmFyQGdtYWlsLmNvbSIsImlhdCI6MTYyMjI3NTkyMiwiZXhwIjoxNjIyMzYyMzIyfQ.D98DFVw4LFmWKXpD9CnYp6t8ZeLaDNpJizQAqo8eX6Y"},
     );

     if (response.statusCode == 200) {
       // If the server did return a 200 OK response,
       // then parse the JSON.

       return User.fromJson(jsonDecode(response.body));
     } else {
       // If the server did not return a 200 OK response,
       // then throw an exception.
       throw Exception('Failed to load album');
     }
   }


    String formater(String url) {
      return BASEURL + url;
    }

}