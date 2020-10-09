const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
