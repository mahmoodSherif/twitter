const router = require('express').Router();
const { createTweet, tweetsByUserId } = require('../controllers/tweets');

router.post('/tweets/', createTweet);
router.get('/users/:userId/tweets/', tweetsByUserId);
module.exports = router;
