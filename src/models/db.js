import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // 请替换为你的数据库密码
  database: 'currency',
  connectionLimit: 10,
})

export default pool
