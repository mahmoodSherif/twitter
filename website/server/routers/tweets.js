const router = require('express').Router();
const passport = require('passport');
const {
  createTweet, tweetsByUserId, likeTweet, unLikeTweet,
} = require('../controllers/tweets');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/tweets/', createTweet);
router.get('/users/:userId/tweets/', tweetsByUserId);

router.post('/tweets/:tweetId/likes', likeTweet);
router.delete('/tweets/:tweetId/likes', unLikeTweet);
module.exports = router;
