const router = require('express').Router();
const passport = require('passport');
const {
  createTweet, tweetsByUserId, likeTweet, unLikeTweet, feed, commentByTweetId, comment, reTweet,unReTweet
} = require('../controllers/tweets');

router.use(passport.authenticate('jwt', { session: false }));

router.use('/feed/', feed);
router.post('/tweets/', createTweet);
router.get('/users/:userId/tweets/', tweetsByUserId);

router.post('/tweets/:tweetId/likes', likeTweet);
router.delete('/tweets/:tweetId/likes', unLikeTweet);

router.get('/tweets/:tweetId/comments', commentByTweetId);
router.post('/tweets/:tweetId/comments', comment);


router.post('/tweets/:tweetId/retweets', reTweet);
router.delete('/tweets/:tweetId/retweets', unReTweet);

module.exports = router;
