const express = require('express');
const router = express.Router()

const admissionController = require('../controllers/admissionController')

router.post('/create',admissionController.createAdmission)
router.post('/findEmail',admissionController.findByEmail)
router.get('/find/:id',admissionController.findById)
router.delete('/delete', admissionController.deleteAdmission)
module.exports = router;