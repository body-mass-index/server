const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bmiSchema = new Schema({
  url_image: String,
  status: String,
  ideal: String,
  result: Number,
  userId: {
        type: Schema.Types.ObjectId, ref: "User"
    }
})

let bmi = mongoose.model('bmi', bmiSchema)

module.exports = bmi