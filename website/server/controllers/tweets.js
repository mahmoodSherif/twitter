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
  const userId = req.user.id;
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

async function likeTweet(req, res, next) {
  const userId = req.user.id;
  const { tweetId } = req.params;
  const queryText = `INSERT INTO tweetsLikes (userId, tweetId) 
    VALUES ('${userId}', '${tweetId}') ON CONFLICT DO NOTHING`;
  try {
    await db.query(queryText);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function unLikeTweet(req, res, next) {
  const userId = req.user.id;
  const { tweetId } = req.params;
  const queryText = `DELETE FROM tweetsLikes WHERE userId = '${userId}' 
    AND tweetId = '${tweetId}' `;
  try {
    await db.query(queryText);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  feed,
  createTweet,
  tweetsByUserId,
  likeTweet,
  unLikeTweet,
};
