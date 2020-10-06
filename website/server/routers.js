const router = require('express').Router();
const { feed } = require('./controllers/tweets');

router.use('/feed/', feed);

module.exports = router;
