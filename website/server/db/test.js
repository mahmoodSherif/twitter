require('dotenv').config();
const db = require('./index');

const queryText = `INSERT INTO users 
    (nickname, username, email, bio, photoUrl, bannerUrl)
    VALUES('mahmoood', 'sdvsdcsdcsdv', 'vsdvsd@gmail.com', 
    '', '', '')  RETURNING id`;

db.query(queryText).then((obj) => console.log(obj));
