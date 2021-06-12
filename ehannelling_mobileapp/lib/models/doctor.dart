
class Doctor {
  final String Id;
  final String Name;
  final String Email;
  final String Mobile;

  Doctor({
    this.Id,
    this.Name,
    this.Email,
    this.Mobile
  });

  factory Doctor.fromJson(Map<String, dynamic> json) {

    return Doctor(
      Id: json["Id"] as String,
      Name: json["Name"] as String,
    );
  }


}