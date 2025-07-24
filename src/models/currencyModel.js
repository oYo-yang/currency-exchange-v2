import db from './db.js'

export function getAllCurrencies(limit = 20, offset = 0) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM currencies LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}

export function getCurrencyByCode(code) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM currencies WHERE code = ?', [code], (err, results) => {
      if (err) return reject(err)
      resolve(results[0])
    })
  })
}

export function createCurrency({ code, name, symbol, country }) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO currencies (code, name, symbol, country) VALUES (?, ?, ?, ?)'
    db.query(sql, [code, name, symbol, country], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function updateCurrency(code, { name, country }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE currencies SET name = ?, country = ? WHERE code = ?'
    db.query(sql, [name, country, code], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export function deleteCurrency(code) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM currencies WHERE code = ?', [code], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
