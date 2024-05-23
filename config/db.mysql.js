const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mydb', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const User = require('../models/User')(sequelize, DataTypes);

sequelize.sync({ alter: true }).then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table: ', error);
});

module.exports = { sequelize, User };