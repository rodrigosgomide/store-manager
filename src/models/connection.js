const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
});

module.exports = connection;
