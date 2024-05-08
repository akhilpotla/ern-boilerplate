const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'user',
  database: 'mydb',
  password: 'password'
});

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

connection.query(sql);

module.exports = connection;


// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('mydb', 'user', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });

// const User = sequelize.define('users', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   }
// }, { timestamps: true }); // The default for timestamps is true

// sequelize.sync().then(() => {
//   console.log('User table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table: ', error);
// });

// module.exports = { sequelize, User };