const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
})

router.get('/verify', (req, res) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false })
  }
  try {
    jwt.verify(header.slice(7), process.env.JWT_SECRET)
    res.json({ valid: true })
  } catch {
    res.status(401).json({ valid: false })
  }
})

module.exports = router
