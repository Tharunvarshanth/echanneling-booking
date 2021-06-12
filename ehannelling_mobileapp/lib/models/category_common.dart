
class Hospital{
  final String Id;
  final String Name;
  final String Email;
  final String Contact;
  final String Location;
  Hospital({
    this.Id,
    this.Name,
    this.Email,
    this.Contact,
    this.Location
  });

  factory Hospital.fromJson(Map<String, dynamic> json) {
    print("k");
    print(json);
    return Hospital(
      Id: json["Id"] as String ,
      Name: json["Name"] as String,
    );
  }



}