const router = require('express').Router();
const userRouter = require('./routers/users');
const tweetRouter = require('./routers/tweets');

router.use(userRouter);
router.use(tweetRouter);
module.exports = router;
