import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db.js'
const JWT_SECRET = 'your_jwt_secret' // 请替换为安全密钥

const router = express.Router()

// 注册
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length) return res.status(409).json({ error: 'Email already registered' })
    const password_hash = await bcrypt.hash(password, 10)
    pool.query(
      'INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)',
      [email, password_hash, username],
      (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'User registered successfully' })
      }
    )
  })
})

// 登录
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!results.length) return res.status(401).json({ error: 'Invalid credentials' })
    const user = results[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    })
    res.json({ token })
  })
})

// JWT 认证中间件
function auth(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ error: 'No token provided' })
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
}

// 获取当前用户信息
router.get('/profile', auth, (req, res) => {
  pool.query(
    'SELECT username, email FROM users WHERE user_id = ?',
    [req.user.user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      if (!results.length) return res.status(404).json({ error: 'User not found' })
      res.json(results[0])
    }
  )
})

// 更新当前用户信息
router.put('/profile', auth, async (req, res) => {
  const { username, email, password } = req.body
  pool.query('SELECT * FROM users WHERE user_id = ?', [req.user.user_id], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!results.length) return res.status(404).json({ error: 'User not found' })
    const user = results[0]
    const newUsername = username || user.username
    const newEmail = email || user.email
    const newPasswordHash = password ? await bcrypt.hash(password, 10) : user.password_hash
    pool.query(
      'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?',
      [newUsername, newEmail, newPasswordHash, req.user.user_id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ message: 'User updated' })
      }
    )
  })
})

// 删除当前用户
router.delete('/delete', auth, (req, res) => {
  pool.query('DELETE FROM users WHERE user_id = ?', [req.user.user_id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'User deleted' })
  })
})

export default router
