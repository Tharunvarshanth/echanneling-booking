const express = require('express')
const router  = express.Router()
const verifyToken = require('../utils/VerifyToken')
var TimeScheduleController = require('../controllers/time-scheduleController')



//router.use(verifyToken)
router.post('/addnewtime',TimeScheduleController.add_new_schedule)
router.get('/getbyDoctorId',TimeScheduleController.get_scheduleby_DoctorId)
router.get('/getbyHospitalId',TimeScheduleController.get_scheduleby_HospitalId)
router.get('/getbySpecializationId',TimeScheduleController.get_scheduleby_SpecializationId)





module.exports = router