const express = require("express");
const router = express.Router();
const { readCourse, readCourseById, postCourse, delCourse, putCourse, readByCourseName, delCourseByName } = require('../controllers/courseController');

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management
 */

/**
 * @swagger
 * /course/read:
 *   get:
 *     summary: Read course information
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Successfully retrieved course information
 */
router.get('/read', readCourse);

/**
 * @swagger
 * /course/post:
 *   post:
 *     summary: Post a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseCode:
 *                 type: string
 *               courseTitle:
 *                 type: string
 *               parentProgramme:
 *                 type: string
 *               duration:
 *                 type: number
 *               currentVersion:
 *                 type: number
 *               assetLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *               disicplineTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               trainers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully posted course
 *       400:
 *         description: Bad request or course already exists
 */
router.post('/post', postCourse);

/**
 * @swagger
 * /course/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to delete
 *     responses:
 *       204:
 *         description: Successfully deleted course
 *       400:
 *         description: Course not found
 *   put:
 *     summary: Update a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseCode:
 *                 type: string
 *               courseTitle:
 *                 type: string
 *               parentProgramme:
 *                 type: string
 *               duration:
 *                 type: number
 *               currentVersion:
 *                 type: number
 *               assetLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *               disicplineTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               trainers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully updated course
 *       400:
 *         description: Bad request or course not found
 */
router.route('/:id').delete(delCourse).put(putCourse);

/**
 * @swagger
 * /course/read/{id}:
 *   get:
 *     summary: Read a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to read
 *     responses:
 *       200:
 *         description: Successfully retrieved course information
 *       404:
 *         description: Course not found
 */
router.route('/read/:id').get(readCourseById);

/**
 * @swagger
 * /course/name/{name}:
 *   get:
 *     summary: Read a course by name
 *     tags: [Course]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the course to read
 *     responses:
 *       200:
 *         description: Successfully retrieved course information
 *       404:
 *         description: Course not found
 */
router.route('/name/:name').get(readByCourseName);

/**
 * @swagger
 * /course/del/{name}:
 *   delete:
 *     summary: Delete a course by name
 *     tags: [Course]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the course to delete
 *     responses:
 *       204:
 *         description: Successfully deleted course
 *       404:
 *         description: Course not found
 */
router.route('/del/:name').delete(delCourseByName);

module.exports = router;
