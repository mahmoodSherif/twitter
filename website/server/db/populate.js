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

  const query2Text = `INSERT INTO usersCredential 
  (id, password)
  VALUES('${id}', '${user.password}')`;
  await db.query(query2Text);
  return id;
}

async function createTweet(userId) {
  const { text } = faker.lorem.text();
  const queryText = `INSERT INTO tweets 
    (userId, text, createdAt)
    VALUES ('${userId}', '${text}', NOW() )`;
  await db.query(queryText);
}

async function follow(userId, followerId) {
  const queryText = `INSERT INTO following (userId, followerId) 
    VALUES ('${userId}', '${followerId}') ON CONFLICT DO NOTHING`;
  await db.query(queryText);
}

(async () => {
  const users = [
    createUser(),
    createUser(),
    createUser(),

  ];
  users.forEach((userId) => {
    createTweet(userId);
    createTweet(userId);
    createTweet(userId);
    createTweet(userId);
  });
  users.forEach((userId) => {
    users.forEach((followerId) => {
      if (userId !== followerId) {
        follow(userId, followerId);
      }
    });
  });
})();
