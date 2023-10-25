const { Pool } = require('pg');
const path = require('path');

const dotenv = require('dotenv');

const env = (process.env.NODE_ENV === 'test') ? path.join(__dirname + '/../../.env.test') : path.join(__dirname, '..', '..', '.env');
// console.log('env:', env);

dotenv.config({ path: env });



const PG_URI = process.env.DATABASE_URI;
console.log(PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
