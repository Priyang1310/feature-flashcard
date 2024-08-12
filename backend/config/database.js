const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'http://sql12.freesqldatabase.com/',
  user: 'sql12725420',
  password: 'L68yrVi1S2',
  database: 'sql12725420',
  port:3306
const sequelize = new Sequelize('flashcard_db', 'flashcard_user', 'your_password', {
  host: 'mysql-2e66b442-consistentcoderpriyangdesai-7606.k.aivencloud.com',
  dialect: 'mysql',
});

module.exports = pool;
