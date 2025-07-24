import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your_jwt_secret' // 请替换为安全的密钥

export default function (req, res, next) {
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
