const express = require("express");
const router = express.Router();
const { readUser, signUp, login } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/read:
 *   get:
 *     summary: Read user information
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 */
router.get('/read', readUser);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully signed up
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/signup', signUp);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
