const passport = require('passport');
const jwt = require('jsonwebtoken');
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
    '${user.bio}', '${user.photoUrl}', '${user.bannerUrl}') RETURNING id`;
  let id;
  try {
    const ret = await db.query(queryText);
    id = ret.rows[0].id;
  } catch (err) {
    next(err);
  }
  const query2Text = `INSERT INTO usersCredential 
    (id, password)
    VALUES('${id}', '${user.password}')`;

  try {
    await db.query(query2Text);
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

async function login(req, res, next) {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      res.status(400).json({
        message: 'lol',
        user,
        err,
      });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        res.send(err);
      }
      const token = await jwt.sign(JSON.stringify(user), process.env.JWT);
      res.json({ user, token });
    });
  })(req, res);
}

module.exports = {
  createUser,
  findUserById,
  follow,
  unfollow,
  login,
};
