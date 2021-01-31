const db = require('../db');

async function feed(req, res, next) {
  const userId = req.user.id;
  const queryText = `SELECT row_to_json(tweets.*) AS tweet, 
  row_to_json(users.*) AS user,
  (tweetslikes.tweetid is not null) AS liked
  FROM tweets 
  INNER JOIN following ON tweets.userId = following.userId 
  INNER JOIN users ON tweets.userId = users.id
  LEFT JOIN tweetsLikes ON tweetsLikes.tweetId = tweets.id
  WHERE following.followerId = '${userId}'
  ORDER BY tweets.createdAt DESC`;
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
  const queryText = `SELECT row_to_json(tweets.*) as tweet,
    row_to_json(users.*) as user,
    (tweetslikes.tweetid is not null) AS liked
    FROM tweets 
    INNER JOIN users ON tweets.userId = users.id
    LEFT JOIN tweetsLikes ON tweetsLikes.tweetId = tweets.id
    WHERE tweets.userId = '${userId}'
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

async function comment(req, res, next) {
  const userId = req.user.id;
  const { tweetId } = req.params;
  const { text } = req.body;
  const queryText = `INSERT INTO comments (userId, tweetId, text, createdAt) 
    VALUES ('${userId}' , '${tweetId}' , '${text}', NOW() )`;

  try {
    await db.query(queryText);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function commentByTweetId(req, res, next) {
  const { tweetId } = req.params;
  const queryText = `SELECT row_to_json(comments.*) as comment,
  row_to_json(users.*) as user
  FROM comments 
  INNER JOIN users ON comments.userId = users.id
  WHERE comments.tweetId = '${tweetId}'
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
  likeTweet,
  unLikeTweet,
  comment,
  commentByTweetId,
};
