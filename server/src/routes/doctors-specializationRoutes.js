const express  = require('express')
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')
const DoctorsSpecialization = require('../controllers/doctors-specializationController');
const app = require('../../app');


//router.use(verifyToken)
router.post('/createnewspecialization',DoctorsSpecialization.addNewSpecialization)








module.exports = router