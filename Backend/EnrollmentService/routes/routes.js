const express = require('express');
const router = express.Router()

const enrollmentController = require('../controllers/EnrollmentController')

router.get('/:subjectCode',enrollmentController.findSubject)
router.post('/create',enrollmentController.createSubject)

module.exports = router;