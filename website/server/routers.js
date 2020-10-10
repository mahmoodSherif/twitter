const router = require('express').Router();
const { feed } = require('./controllers/tweets');
const userRouter = require('./routers/users');

router.use('/feed/', feed);
router.use(userRouter);
module.exports = router;
