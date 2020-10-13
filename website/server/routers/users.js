const router = require('express').Router();
const passport = require('passport');
const {
  findUserById, createUser, follow, unfollow, login,
} = require('../controllers/users');

router.post('/login/', login);

router.get('/users/:userId/', passport.authenticate('local', { session: false }), findUserById);
router.post('/users/', createUser);
router.post('/users/follow', follow);
router.delete('/users/follow', unfollow);

module.exports = router;
