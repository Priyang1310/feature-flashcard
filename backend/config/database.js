const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'http://sql12.freesqldatabase.com/',
  user: 'sql12725420',
  password: 'L68yrVi1S2',
  database: 'sql12725420',
  port:3306
});

module.exports = pool;
