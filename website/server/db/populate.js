/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const faker = require('faker');
const db = require('./index');

async function createUser() {
  const user = {
    nickname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    bio: faker.lorem.words(5),
    photoUrl: faker.image.avatar(),
    bannerUrl: faker.image.image(),
    password: 'pass',
  };

  const queryText = `INSERT INTO users 
  (nickname, username, email, bio, photoUrl, bannerUrl)
  VALUES('${user.nickname}', '${user.username}', '${user.email}', 
  '${user.bio}', '${user.photoUrl}', '${user.bannerUrl}') RETURNING id`;

  const ret = await db.query(queryText);
  const { id } = ret.rows[0];

  const userFollowHimselfQuery = `INSERT INTO following VALUES (${id},${id})`;
  const query2Text = `INSERT INTO usersCredential 
  (id, password)
  VALUES('${id}', '${user.password}')`;
  await db.query(query2Text);
  await db.query(userFollowHimselfQuery);
  return id;
}

async function createTweet(userId) {
  const text = faker.lorem.text();
  const createdAt = faker.date.past().toISOString();
  const queryText = `INSERT INTO tweets 
    (userId, text, createdAt)
    VALUES ('${userId}', '${text}', '${createdAt}')`;
  await db.query(queryText);
}

async function follow(userId, followerId) {
  const queryText = `INSERT INTO following (userId, followerId) 
    VALUES ('${userId}', '${followerId}') ON CONFLICT DO NOTHING`;
  await db.query(queryText);
}

(async () => {
  const users = [
    await createUser(),
    await createUser(),
    await createUser(),

  ];
  for (let i = 0; i < users.length; i++) {
    const userId = users[i];
    await createTweet(userId);
    await createTweet(userId);
    await createTweet(userId);
    await createTweet(userId);
  }
  for (let i = 0; i < users.length; i++) {
    const userId = users[i];
    for (let j = 0; j < users.length; j++) {
      const followerId = users[j];
      if (userId !== followerId) {
        await follow(userId, followerId);
      }
    }
  }
})();
