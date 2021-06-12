const express  = require('express')
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')
var SpecializationController  = require('../controllers/specializationController');



//router.use(verifyToken)
router.post('/addnewspecification',SpecializationController.addNewType)
router.get('/getspecficationlist',SpecializationController.get_all_types_id)
router.get('/getbyId',SpecializationController.get_type_by_id)

module.exports = router