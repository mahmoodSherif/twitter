const router = require('express').Router();
const {
  createTweet, tweetsByUserId, likeTweet, unLikeTweet,
} = require('../controllers/tweets');

router.post('/tweets/', createTweet);
router.get('/users/:userId/tweets/', tweetsByUserId);

router.post('/tweets/:tweetId/likes', likeTweet);
router.delete('/tweets/:tweetId/likes', unLikeTweet);
module.exports = router;
