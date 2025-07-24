import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as UserModel from '../models/userModel.js'

const JWT_SECRET = 'your_jwt_secret' // 请替换为安全的密钥

export async function register(req, res) {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const existing = await UserModel.findUserByEmail(email)
    if (existing) return res.status(409).json({ error: 'Email already registered' })
    const password_hash = await bcrypt.hash(password, 10)
    await UserModel.createUser({ email, password_hash, username })
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
    const user = await UserModel.findUserByEmail(email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function profile(req, res) {
  try {
    const user = await UserModel.findUserById(req.user.user_id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ username: user.username, email: user.email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateProfile(req, res) {
  try {
    const { username, email, password } = req.body
    const password_hash = password ? await bcrypt.hash(password, 10) : undefined
    const user = await UserModel.findUserById(req.user.user_id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    await UserModel.updateUser(req.user.user_id, {
      username: username || user.username,
      email: email || user.email,
      password_hash: password_hash || user.password_hash,
    })
    res.json({ message: 'User updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteUser(req, res) {
  try {
    await UserModel.deleteUser(req.user.user_id)
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
