const router = require('express').Router();
const { findUserById, createUser } = require('../controllers/users');

router.get('/users/:userId/', findUserById);
router.post('/users/', createUser);

module.exports = router;
