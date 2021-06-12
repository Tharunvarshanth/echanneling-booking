const express  = require('express')
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')
var doctorController  = require('../controllers/doctorController')


//router.use(verifyToken)
router.post('/register',doctorController.add_new_doctor)
router.get('/doctorinfo')
router.get('/doctorsnameandidlist',doctorController.doctors_name_and_id_list)
router.get('/getdetailsbyid',doctorController.doctors_detail_by_id)

module.exports = router
