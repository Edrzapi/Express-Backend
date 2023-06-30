const express = require("express");
const router = express.Router();
const { 
    readUser,
    signUp,
    login
    } = require('../controllers/userController');

router.get('/read', readUser);
router.post('/signup', signUp);
router.post('/login', login);
module.exports = router;
