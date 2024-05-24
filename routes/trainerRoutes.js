const express = require("express");
const router = express.Router();
const { readTrainer, readTrainerById, postTrainer, delTrainer, putTrainer } = require('../controllers/trainerController');

/**
 * @swagger
 * tags:
 *   name: Trainer
 *   description: Trainer management
 */

/**
 * @swagger
 * /trainer/read:
 *   get:
 *     summary: Read trainer information
 *     tags: [Trainer]
 *     responses:
 *       200:
 *         description: Successfully retrieved trainer information
 */
router.get('/read', readTrainer);

/**
 * @swagger
 * /trainer/post:
 *   post:
 *     summary: Post a new trainer
 *     tags: [Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerName:
 *                 type: string
 *               employeeId:
 *                 type: string
 *               comprehension:
 *                 type: object
 *     responses:
 *       201:
 *         description: Successfully posted trainer
 *       400:
 *         description: Bad request or course code not found
 */
router.post('/post', postTrainer);

/**
 * @swagger
 * /trainer/{id}:
 *   delete:
 *     summary: Delete a trainer by ID
 *     tags: [Trainer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to delete
 *     responses:
 *       204:
 *         description: Successfully deleted trainer
 * @swagger
 * /trainer/{id}:
 *   put:
 *     summary: Update a trainer by ID
 *     tags: [Trainer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerName:
 *                 type: string
 *               employeeId:
 *                 type: string
 *               comprehensions:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully updated trainer
 *       400:
 *         description: Bad request or trainer not found
 */

router.route('/:id').delete(delTrainer).put(putTrainer);

/**
 * @swagger
 * /trainer/read/{id}:
 *   get:
 *     summary: Read a trainer by ID
 *     tags: [Trainer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trainer to read
 *     responses:
 *       200:
 *         description: Successfully retrieved trainer information
 *       404:
 *         description: Trainer not found
 */
router.route('/read/:id').get(readTrainerById);

module.exports = router;
