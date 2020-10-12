const db = require('../db');

async function feed(req, res, next) {
  const { userId } = req.params;
  const queryText = `SELECT tweets.* FROM tweets 
    INNER JOIN following ON tweets.userId = following.userId 
    WHERE following.followerId = ${userId} OR tweets.userId = ${userId};`;
  try {
    const ret = await db.query(queryText);
    res.json(ret.rows);
  } catch (err) {
    next(err);
  }
}

async function createTweet(req, res, next) {
  const { userId } = req.body;
  const { text } = req.body;
  const queryText = `INSERT INTO tweets 
  (userId, text, createdAt)
  VALUES ('${userId}', '${text}', NOW() )`;
  try {
    await db.query(queryText);
    res.json('OK');
  } catch (err) {
    next(err);
  }
}

async function tweetsByUserId(req, res, next) {
  const { userId } = req.params;
  const queryText = `SELECT * FROM tweets WHERE userId = '${userId}'
    ORDER BY createdAt DESC`;
  try {
    const ret = await db.query(queryText);
    res.json(ret.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  feed,
  createTweet,
  tweetsByUserId,
};
