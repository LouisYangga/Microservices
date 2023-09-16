const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/login',userController.loginUser)
router.post('/register',userController.createUser)
router.get('/find',userController.findByEmail)
router.get('/all',userController.getAllUser)
router.delete('/delete', userController.deleteUser)
module.exports = router;