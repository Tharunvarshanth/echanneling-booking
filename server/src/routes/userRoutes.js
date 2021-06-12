const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/VerifyToken')
var userController = require('../controllers/userController')





router.post('/register',userController.create_user)
router.post('/login',userController.login)

//router.use(verifyToken)
router.get('/userinfo',userController.get_userinfo)
router.post('/useredit',userController.edit_user_info)



module.exports = router
