const db = require('../db');

async function createUser(req, res, next) {
  const user = {
    bio: '',
    photoUrl: '',
    bannerUrl: '',
    ...req.body,
  };
  const queryText = `INSERT INTO users 
    (nickname, username, email, bio, photoUrl, bannerUrl)
    VALUES('${user.nickname}', '${user.username}', '${user.email}', 
    '${user.bio}', '${user.photoUrl}', '${user.bannerUrl}')`;
  try {
    await db.query(queryText);
    res.send(200);
  } catch (err) {
    next(err);
  }
}

async function findUserById(req, res, next) {
  const { userId } = req.params;
  const queryText = `SELECT * FROM users WHERE id = ${userId}`;
  try {
    const ret = await db.query(queryText);
    res.json(ret.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function follow(req, res, next) {
  const { userId } = req.body;
  const { followerId } = req.body; // the current user
  const queryText = `INSERT INTO following (userId, followerId) 
    VALUES ('${userId}', '${followerId}') ON CONFLICT DO NOTHING`;
  try {
    await db.query(queryText);
    res.json(200);
  } catch (err) {
    next(err);
  }
}

async function unfollow(req, res, next) {
  const { userId } = req.body;
  const { followerId } = req.body; // the current user
  const queryText = `DELETE FROM following
    WHERE userId = '${userId}' AND followerId = '${followerId}' `;
  try {
    await db.query(queryText);
    res.json(200);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  findUserById,
  follow,
  unfollow,
};
