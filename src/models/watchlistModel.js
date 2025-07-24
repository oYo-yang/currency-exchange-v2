import db from './db.js'

export function getAllWatchlists() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM watchlists', (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}

export function createWatchlist({ userId, currencies }) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO watchlists (userId, currencies) VALUES (?, ?)'
    db.query(sql, [userId, JSON.stringify(currencies)], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function getWatchlistById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM watchlists WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err)
      resolve(results[0])
    })
  })
}

export function updateWatchlist(id, { currencies }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE watchlists SET currencies = ? WHERE id = ?'
    db.query(sql, [JSON.stringify(currencies), id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function deleteWatchlist(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM watchlists WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function searchWatchlistsByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM watchlists WHERE userId = ?', [userId], (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}
