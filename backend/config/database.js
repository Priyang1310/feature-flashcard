// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('flashcard_db', 'flashcard_user', 'your_password', {
  host: 'mysql-2e66b442-consistentcoderpriyangdesai-7606.k.aivencloud.com',
  dialect: 'mysql',
});

module.exports = sequelize;
