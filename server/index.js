require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

// Security headers
app.use(helmet())

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://mohammed-alazaar.github.io',
  ]
}))

app.set('trust proxy', 1)
app.use(express.json({ limit: '50kb' }))

// Rate limiting — general
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
}))

// Stricter rate limit on login endpoint
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' },
}))

// DB
const MONGODB_URI = process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.4iztyjv.mongodb.net/portfolio?appName=Cluster0`

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => { console.error('MongoDB connection error:', err.message); process.exit(1) })

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/experiences', require('./routes/experiences'))

app.get('/api/health', (req, res) => res.json({ ok: true }))

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
