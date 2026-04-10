const mongoose = require('mongoose')

const ContributionSchema = new mongoose.Schema({
  icon: String,
  title: String,
  desc: String,
})

const ExperienceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    company: { type: String, required: true },
    role: String,
    period: String,
    current: { type: Boolean, default: false },
    location: String,
    eyebrow: String,
    headline: String,
    description: String,
    about: String,
    story: String,
    tags: [String],
    responsibilities: [String],
    contributions: [ContributionSchema],
    outcomes: [String],
    brand: {
      name: String,
      initials: String,
      tagline: String,
      url: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Experience', ExperienceSchema)
