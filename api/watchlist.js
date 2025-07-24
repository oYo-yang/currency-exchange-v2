import express from 'express'
import pool from '../db.js'

const router = express.Router()

// 查询所有 watchlist
router.get('/', (req, res) => {
  pool.query('SELECT * FROM watchlists', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

// 新增 watchlist
router.post('/', (req, res) => {
  const { userId, currencies } = req.body
  if (!userId || !currencies) return res.status(400).json({ error: 'Missing fields' })
  pool.query(
    'INSERT INTO watchlists (userId, currencies) VALUES (?, ?)',
    [userId, JSON.stringify(currencies)],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.status(201).json({ message: 'Watchlist created' })
    }
  )
})

// 查询单个 watchlist
router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM watchlists WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!results.length) return res.status(404).json({ error: 'Watchlist not found' })
    res.json(results[0])
  })
})

// 更新 watchlist
router.put('/:id', (req, res) => {
  const { currencies } = req.body
  pool.query(
    'UPDATE watchlists SET currencies = ? WHERE id = ?',
    [JSON.stringify(currencies), req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Watchlist not found' })
      res.json({ message: 'Watchlist updated' })
    }
  )
})

// 删除 watchlist
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM watchlists WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Watchlist not found' })
    res.json({ message: 'Watchlist deleted' })
  })
})

// 按 userId 查询 watchlist
router.get('/search', (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  pool.query('SELECT * FROM watchlists WHERE userId = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

export default router
