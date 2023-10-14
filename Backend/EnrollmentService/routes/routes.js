const express = require('express');
const router = express.Router()

const enrollmentController = require('../controllers/EnrollmentController')

router.get('/subjects',enrollmentController.getSubjects)
router.get('/:subjectCode',enrollmentController.findSubject)
router.get('/students/:subjectCode',enrollmentController.getStudents)
router.post('/create',enrollmentController.createSubject)
router.post('/enroll',enrollmentController.enrollStudent)

module.exports = router;