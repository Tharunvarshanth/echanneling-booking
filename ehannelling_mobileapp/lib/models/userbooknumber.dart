
class UserBookNumber{
  final String user;
  final int no;

  UserBookNumber({this.user, this.no});

  factory UserBookNumber.fromJson(Map<String,dynamic> json){
   print(json);
    return UserBookNumber(
      user: json["user"] as String,
      no :json["no"] as int
    );
  }

}