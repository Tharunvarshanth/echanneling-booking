const express = require('express')
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')
var hospitalController  = require('../controllers/hospitalController')


//router.use(verifyToken)
router.post('/register',hospitalController.add_new_hospital)
router.get('/hospitalsnameandidlist',hospitalController.gethospital_name_and_Id)
router.get('/hospitaldetailbyid',hospitalController.get_hospital_detail_by_id)

module.exports = router