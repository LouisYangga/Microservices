const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/login',userController.loginUser)
router.post('/register',userController.createUser)
router.post('/find',userController.findByEmail)
router.post('/addSubject',userController.addSubject)
router.post('/removeSubject',userController.removeSubject)
router.get('/all',userController.getAllUser)
router.delete('/delete', userController.deleteUser)
router.put('/admit',userController.setAdmittance)
module.exports = router;