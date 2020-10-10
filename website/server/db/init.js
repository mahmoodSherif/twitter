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

async function createTweetsTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    userId INT references users(id),
    text TEXT NOT NULL,
    createdAt DATE NOT NULL
    );`;
  await db.query(queryText);
}

(async () => {
  await createUsersTable();
  await createTweetsTable();
})().catch((err) => console.log(err));
