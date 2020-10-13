require('dotenv').config();
const db = require('./index');

async function createUsersTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nickname TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    bio TEXT,
    photoUrl TEXT,
    bannerUrl TEXT  
    );`;
  await db.query(queryText);
}

async function createUsersCredentialTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS usersCredential (
    id INT references users(id),
    password TEXT NOT NULL  
    );`;
  await db.query(queryText);
}

async function createTweetsTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    userId INT references users(id),
    text TEXT NOT NULL,
    createdAt DATE NOT NULL
    );`;
  await db.query(queryText);
}

async function createTweetsLikesTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS tweetsLikes (
    userId INT references users(id),
    tweetId INT references tweets(id),
    PRIMARY KEY(tweetId, userId)
    );`;
  await db.query(queryText);
}

async function createFollowingTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS following (
    userId INT references users(id),
    followerId INT references users(id),
    PRIMARY KEY(followerId, userId)
    );`;
  await db.query(queryText);
}

(async () => {
  await createUsersTable();
  await createTweetsTable();
  await createTweetsLikesTable();
  await createFollowingTable();
  await createUsersCredentialTable();
})().catch((err) => console.log(err));
