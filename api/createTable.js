import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

// 创建连接
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '***' : '未设置');

// 连接数据库
connection.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err.message);
    return;
  }
  console.log('连接成功');

  // 执行建表语句
  const creatCurrencyTable=`create table currencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR (30) NOT NULL UNIQUE,
    name VARCHAR(30) NOT NULL,
    symbol VARCHAR(30),
    country VARCHAR(30),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

const createUserTable=`CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

  connection.query(creatCurrencyTable, (err, results) => {
    if (err) {
      console.error('建currency失败:', err.message);
    } else {
      console.log('建currency成功:', results);
    }
});

  connection.query(createUserTable, (err, results) => {
    if (err) {
      console.error('建user失败:', err.message);
    } else {
      console.log('建user成功:', results);
    }
});

const insertCurrencySql=`INSERT INTO currencies (code, name, symbol, country)
VALUES 
('USD', 'US Dollar', '$', 'United States'),
('EUR', 'Euro', '€', 'European Union'),
('JPY', 'Japanese Yen', '¥', 'Japan'),
('GBP', 'British Pound', '£', 'United Kingdom'),
('CNY', 'Chinese Yuan', '¥', 'China');`;    

const insertUsersSql=
`INSERT INTO users (email, password_hash, username)
VALUES
('alice@example.com', 'hashed_password_1', 'alice123'),
('bob@example.com', 'hashed_password_2', 'bob456'),
('carol@example.com', 'hashed_password_3', 'carol789');`;

connection.query(insertUsersSql, (err, results) => {
      if (err) {
        console.error('插入数据失败:', err.message);
      } else {
        console.log('插入数据成功:', results);
      }
      connection.end();
    });
});