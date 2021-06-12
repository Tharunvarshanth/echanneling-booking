
class User{

  final String Id;
  final String Username;
  final String Displayname;
  final String Mobile;
  final String Role;

   User({
     this.Id,
     this.Username,
     this.Displayname,
     this.Mobile,
     this.Role
   });

   factory User.fromJson(Map<String, dynamic> json) {

     return User(
       Id: json["Id"] as String,
       Username: json["Username"] as String,
       Displayname: json["Displayname"] as String,
       Mobile: json["Mobile"] as String,
       Role: json["Role"] as String
     );
   }
}