

class Specialization{
  final String Id;
  final String Type;

  Specialization({
    this.Id,
    this.Type,
  });

  factory Specialization.fromJson(Map<String, dynamic> json) {

    return Specialization(
      Id: json["Id"] as String ,
      Type: json["Type"] as String,
    );
  }



}