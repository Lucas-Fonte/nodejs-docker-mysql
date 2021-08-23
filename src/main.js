require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');

const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/database/create_table', (req, res) => {
  try {
    const mysqlConnection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    mysqlConnection.connect(function (err) {
      if (err) throw err;
      console.log('Connected!');
      const sql = 'CREATE TABLE customers (name CHAR(255), address CHAR(255))';
      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Table created');
      });
    });
  } catch (error) {
    console.error(error);
  }
  res.json({ create_table: true });
});

app.get('/database/insert_data', (req, res) => {
  const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    const sql =
      "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    mysqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
  res.json({ insert_data: true });
});

app.get('/database/list_data', (req, res) => {
  const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  mysqlConnection.connect(function (err) {
    if (err) throw err;
    mysqlConnection.query(
      'SELECT * FROM customers',
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
  res.json({ list_data: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
