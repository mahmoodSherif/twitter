const router = require('express').Router();
const { feed } = require('./controllers/tweets');
const userRouter = require('./routers/users');
const tweetRouter = require('./routers/tweets');

router.use('/feed/', feed);
router.use(userRouter);
router.use(tweetRouter);
module.exports = router;
