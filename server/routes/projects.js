const router = require('express').Router()
const Project = require('../models/Project')
const requireAuth = require('../middleware/auth')

// Public — read
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 }).lean()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id }).lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Protected — write
router.post('/', requireAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: `A project with ID "${req.body.id}" already exists.` })
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ).lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
