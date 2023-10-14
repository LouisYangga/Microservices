const express = require('express');
const router = express.Router()

const adviceController = require('../controllers/adviceController')

router.post('/create',adviceController.createAdviceRequests)
router.post('/find',adviceController.findByEmail)
router.post('/sendEmail',adviceController.sendEmail)
router.get('/all',adviceController.getAll)

module.exports = router;