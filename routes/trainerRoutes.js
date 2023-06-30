const express = require("express");
const router = express.Router();
const { readTrainer,
    readTrainerById,
    postTrainer,
    delTrainer,
    putTrainer, 
    } = require('../controllers/trainerController');

router.get('/read', readTrainer);
router.post('/post', postTrainer);
router.route('/:id').delete(delTrainer).put(putTrainer);
router.route('/read/:id').get(readTrainerById);

module.exports = router;
