require('dotenv').config();
const db = require('./index');

async function createUsersTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id uuid references users(id),
    password TEXT NOT NULL  
    );`;
  await db.query(queryText);
}

async function createTweetsTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS tweets (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId uuid references users(id),
    text TEXT NOT NULL,
    createdAt timestamp NOT NULL,
    likes_count integer NOT NULL DEFAULT 0,
    comments_count integer NOT NULL DEFAULT 0
    );`;
  await db.query(queryText);
}

async function createCommentsTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId uuid references users(id),
    tweetId uuid references tweets(id),
    text TEXT NOT NULL,
    createdAt timestamp NOT NULL
    );`;
  await db.query(queryText);
}

async function createTweetsLikesTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS tweetsLikes (
    userId uuid references users(id),
    tweetId uuid references tweets(id),
    PRIMARY KEY(tweetId, userId)
    );`;
  await db.query(queryText);
}

async function createFollowingTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS following (
    userId uuid references users(id),
    followerId uuid references users(id),
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
  await createCommentsTable();
})().catch((err) => console.log(err));
