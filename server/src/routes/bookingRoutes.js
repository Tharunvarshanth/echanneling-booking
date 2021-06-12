const express = require('express')
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')

var bookingController = require('../controllers/bookingController')

//router.use(verifyToken)
router.post('/book',bookingController.addbooking);
//router.get('/getlastnumber',bookingController.getlastnumber);

router.get('/getbookinginfo',bookingController.getbookinginfoby_scheduleId_scheduletimeanddateindex)

module.exports = router