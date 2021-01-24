require('dotenv').config();
const db = require('./index');

(async () => {
  const query = 'DROP TABLE comments, following, tweetsLikes, tweets, usersCredential, users';
  await db.query(query);
})();
