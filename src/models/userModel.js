import db from './db.js'

export function createUser({ email, password_hash, username }) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)'
    db.query(sql, [email, password_hash, username], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err)
      resolve(results[0])
    })
  })
}

export function findUserById(user_id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
      if (err) return reject(err)
      resolve(results[0])
    })
  })
}

export function deleteUser(user_id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE user_id = ?', [user_id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function updateUser(user_id, { username, email, password_hash }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?'
    db.query(sql, [username, email, password_hash, user_id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
