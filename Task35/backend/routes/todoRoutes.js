const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/todoController');

router.get('/todo', ctrl.getTaks);
router.post('/todo', ctrl.createTak);
router.put('/todo/:id', ctrl.updateTak);
router.delete('/todo/:id', ctrl.deleteTak);

module.exports = router;
