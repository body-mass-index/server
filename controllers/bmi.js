const bmiModel = require('../models/bmi')
const axios = require('axios')
const unirest = require('unirest')

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
      status: req.body.data.status,
      ideal: req.body.data.ideal,
      result: req.body.data.result,
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
  static findResult(req,res){
    let weight = req.body.weight
    let height = req.body.height
    // console.log(weight,'kg',height,'m')
    unirest.get(`https://gabamnml-health-v1.p.rapidapi.com/bmi?weight=${weight}&height=${height}`)
        .header("X-RapidAPI-Host", "gabamnml-health-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "baae6a8eb5mshb8252ad5b441c8dp1f5229jsn6ba1fa057429")
        .end(function (result) {
          // console.log(result.body)
            res.status(200).json(result.body)
        });
  }
}

module.exports = bmi