import 'dart:convert';

import 'package:ehannelling_mobileapp/config/CONSTANT.dart';
import 'package:ehannelling_mobileapp/models/Specialization.dart';
import 'package:ehannelling_mobileapp/models/doctor.dart';
import 'package:ehannelling_mobileapp/models/hospital.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class CategoryListService{

  List<Hospital> parseHospitals(String responseBody) {

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();
    return parsed.map<Hospital>((json) => Hospital.fromJson(json)).toList();
  }

  Future<List<Hospital>> getHospitalIdandName(http.Client client) async{
      String url = formater('hospital/hospitalsnameandidlist');
    var response = await client.get(url,
      headers: {"Authorization": "x-access-token "},
    );
      return parseHospitals(response.body);
  }


  List<Doctor> parseDoctors(String responseBody) {

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Doctor>((json) => Doctor.fromJson(json)).toList();
  }

  Future<List<Doctor>> getDoctorIdandName(http.Client client) async{
    String url = formater('doctor/doctorsnameandidlist');
    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );
    return parseDoctors(response.body);
  }



  List<Specialization> parseSpecialization(String responseBody) {

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Specialization>((json) => Specialization.fromJson(json)).toList();
  }

  Future<List<Specialization>> getSpecificationIdandName(http.Client client) async{
    String url = formater('specialization/getspecficationlist');
    var response = await http.get(url,
      headers: {"Authorization": "x-access-token "},
    );
    return  parseSpecialization(response.body);
  }

}