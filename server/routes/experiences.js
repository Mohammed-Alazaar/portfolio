const router = require('express').Router()
const Experience = require('../models/Experience')
const requireAuth = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 }).lean()
    res.json(experiences)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const exp = await Experience.findOne({ id: req.params.id }).lean()
    if (!exp) return res.status(404).json({ error: 'Experience not found' })
    res.json(exp)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const exp = await Experience.create(req.body)
    res.status(201).json(exp)
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: `ID "${req.body.id}" already exists.` })
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const exp = await Experience.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ).lean()
    if (!exp) return res.status(404).json({ error: 'Experience not found' })
    res.json(exp)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const exp = await Experience.findOneAndDelete({ id: req.params.id })
    if (!exp) return res.status(404).json({ error: 'Experience not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
