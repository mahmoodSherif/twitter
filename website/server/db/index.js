const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function startTransaction(arr) {
  const client = await pool.connect();
  let res = 0;
  try {
    await client.query('BEGIN');
    const queries = arr.map((queryText) => client.query(queryText));
    await Promise.all(queries);
    await client.query('COMMIT');
  } catch (err) {
    res = -1;
    await client.query('ROLLBACK');
  } finally {
    await client.release();
  }
  return res;
}
module.exports = {
  query: (text, params) => pool.query(text, params),
  startTransaction,
};
