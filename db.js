import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'n3u3da!',
  database: 'currency',
  connectionLimit: 10,
})

export default pool
