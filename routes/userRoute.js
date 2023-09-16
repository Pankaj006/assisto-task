var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController')

router.route('/create').post(UserController.createUser)
router.route('/getUserById/:userId').get(UserController.getUserById)
router.route('/updateUserById/:userId').put(UserController.updateUser)
router.route('/deleteUserById/:userId').delete(UserController.deleteUserById)
router.route('/getAllUser').get(UserController.getAllUser)


module.exports = router;
