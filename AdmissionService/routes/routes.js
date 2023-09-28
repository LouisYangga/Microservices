const express = require('express');
const router = express.Router()

const admissionController = require('../controllers/admissionController')

router.post('/admission',admissionController.createAdmission)
router.get('/find/:id',admissionController.findById)
module.exports = router;