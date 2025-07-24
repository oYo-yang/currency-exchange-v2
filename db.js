import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'currency',
  connectionLimit: 10,
})

export default pool
