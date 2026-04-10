const mongoose = require('mongoose')

const FeatureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  desc: String,
})

const JourneyStepSchema = new mongoose.Schema({
  phase: String,
  title: String,
  desc: String,
  done: { type: Boolean, default: false },
})

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    title: String,
    subtitle: String,
    eyebrow: String,
    description: String,
    url: String,
    year: String,
    tags: [String],
    challenge: {
      heading: String,
      body: String,
      bullets: [String],
    },
    features: [FeatureSchema],
    story: String,
    journey: [JourneyStepSchema],
    outcomes: [String],
    brand: {
      name: String,
      initials: String,
      tagline: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', ProjectSchema)
