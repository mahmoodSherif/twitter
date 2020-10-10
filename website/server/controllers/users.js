const db = require('../db');

async function createUser(req, res, next) {
  const user = req.body;
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

module.exports = {
  createUser,
  findUserById,
};
