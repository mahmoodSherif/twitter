/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const faker = require('faker');
const axios = require('axios');

faker.locale = 'en';
const db = require('./index');
const { password } = require('pg/lib/defaults');

const userById = {};

async function getToken(username, password){
  const config = {
    method: 'post',
    url: 'http://localhost:3000/login/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {username, password}
  };
  return (await axios(config)).data.token;
}

async function createUser(userObj) {
  const user = {
    nickname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    bio: faker.lorem.words(5),
    photoUrl: faker.image.avatar(),
    bannerUrl: faker.image.image(),
    password: 'pass',
    ...userObj,
  };

  const config = {
    method: 'post',
    url: 'http://localhost:3000/users/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : user
  };
  const id =  (await axios(config)).data.id;
  userById[id] = {username: user.username, password: user.password, token: await getToken(user.username, user.password)};
  return id;
}

async function createTweet(userId) {
  const text = faker.lorem.text();
  const tweet = {
    text,
  }
  const token = userById[userId].token;

  const config = {
    method: 'post',
    url: 'http://localhost:3000/tweets/',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data : tweet
  };
    
  return (await axios(config)).data.id;
}

async function createComment(userId, tweetId) {
  const text = faker.lorem.text();
  const token = userById[userId].token;

  const config = {
    method: 'post',
    url: `http://localhost:3000/tweets/${tweetId}/comments`,
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data : {text}
  };
    
  await axios(config);
}

async function follow(userId, followerId) {
  const queryText = `INSERT INTO following (userId, followerId) 
    VALUES ('${userId}', '${followerId}') ON CONFLICT DO NOTHING`;
  await db.query(queryText);
}

(async () => {
  const users = [
    await createUser({username: "root"}),
    await createUser(),
    await createUser(),
    await createUser(),

  ];
  const tweets = [];
  for (let i = 0; i < users.length; i++) {
    const userId = users[i];
    tweets.push(await createTweet(userId));
    tweets.push(await createTweet(userId));
    tweets.push(await createTweet(userId));
    tweets.push(await createTweet(userId));
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
  for (let i = 0; i < tweets.length; i++) {
    for (let j = 0; j < users.length; j++) {
      await createComment(users[j], tweets[i]);
    }
  }
})();
