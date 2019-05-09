const bmiModel = require('../models/bmi')

class bmi {
  static create(req, res) {
    let due_date = new Date
    let date = due_date.getDate()
    let month = due_date.getMonth() + 1
    let year = due_date.getFullYear()
    
    if (date < 10) {
      date = `0${date}`
    }
    if (month < 10) {
      month = `0${month}`
    }
    
    let fullDate = `${year}-${month}-${date}`
    
    let newBMI = {
      url_image: req.file.cloudStoragePublicUrl,
      status: req.body.status,
      ideal: req.body.ideal,
      result: req.body.result,
      userId: req.userId,
      date: fullDate
    }
    bmiModel.create(newBMI)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static findAll(req, res) {
    bmiModel.find({ userId: req.userId })
      .populate("userId")
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static delete(req, res) {
    bmiModel.findByIdAndDelete(req.params.id)
      .populate("author")
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }
}

module.exports = bmi