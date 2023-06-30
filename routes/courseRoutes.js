const express = require("express");
const router = express.Router();
const { readCourse,
    readCourseById,
    readWithTrainers,
    postCourse,
    delCourse,
    putCourse,
    readByCourseName } = require('../controllers/courseController');







router.get('/read', readCourse);
router.post('/post', postCourse);
router.route('/:id').delete(delCourse).put(putCourse);
router.route('/read/:id').get(readCourseById);
router.get('/read/trainer', readWithTrainers);
// Custom
router.route('/name/:name').get(readByCourseName);

module.exports = router;
