import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:http/http.dart' as http;


class DetailInfoByIdService{

  Future<http.Response> getDoctorbyId(id)async{
     String url = formater('doctor/getdetailsbyid');
     url = url+'?Id='+id;

     var response = await http.get(url,
       headers: {"Authorization": "x-access-token "},
     );

     return response;
  }

  Future<http.Response> getHospitalbyId(id)async{
    String url = formater('hospital/hospitaldetailbyid');
    url = url+'?Id='+id;

    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );

    return response;
  }

  Future<http.Response> getSpecializationbyId(id)async{
    String url = formater('specialization/getbyId');
    url = url+'?Id='+id;

    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );

    return response;
  }
}