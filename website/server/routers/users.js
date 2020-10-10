const router = require('express').Router();
const {
  findUserById, createUser, follow, unfollow,
} = require('../controllers/users');

router.get('/users/:userId/', findUserById);
router.post('/users/', createUser);
router.post('/users/follow', follow);
router.delete('/users/follow', unfollow);

module.exports = router;
