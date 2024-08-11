// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('flashcard_db', 'flashcard_user', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
