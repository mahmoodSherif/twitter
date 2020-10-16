const router = require('express').Router();
const passport = require('passport');
const {
  findUserById, createUser, follow, unfollow, login, followers,
} = require('../controllers/users');

router.post('/login/', login);
router.post('/users/', createUser);

router.use(passport.authenticate('jwt', { session: false }));
router.get('/users/:userId/', findUserById);

router.get('/users/:userId/followers', followers);
router.post('/users/:userId/followers', follow);
router.delete('/users/:userId/followers', unfollow);

module.exports = router;
