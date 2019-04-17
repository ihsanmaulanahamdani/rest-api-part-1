const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttandanceSchema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: String
}, {
  timestamps: true
})

const Attandance = mongoose.model('Attadance', AttandanceSchema)

module.exports = Attandance