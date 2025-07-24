import express from 'express'
import pool from '../db.js'

const router = express.Router()

// 查询所有货币
router.get('/', (req, res) => {
  pool.query('SELECT * FROM currencies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

// 新增货币
router.post('/', (req, res) => {
  const { code, name, symbol, country } = req.body
  if (!code || !name || !symbol || !country) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  pool.query(
    'INSERT INTO currencies (code, name, symbol, country) VALUES (?, ?, ?, ?)',
    [code, name, symbol, country],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Currency code already exists' })
        }
        return res.status(500).json({ error: err.message })
      }
      res.status(201).json({ message: 'Currency created' })
    }
  )
})

// 查询单个货币
router.get('/:code', (req, res) => {
  pool.query('SELECT * FROM currencies WHERE code = ?', [req.params.code], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!results.length) return res.status(404).json({ error: 'Currency not found' })
    res.json(results[0])
  })
})

// 更新货币
router.put('/:code', (req, res) => {
  const { name, country } = req.body
  pool.query(
    'UPDATE currencies SET name = ?, country = ? WHERE code = ?',
    [name, country, req.params.code],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Currency not found' })
      res.json({ message: 'Currency updated' })
    }
  )
})

// 删除货币
router.delete('/:code', (req, res) => {
  pool.query('DELETE FROM currencies WHERE code = ?', [req.params.code], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Currency not found' })
    res.status(204).send()
  })
})

export default router
