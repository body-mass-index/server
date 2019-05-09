const modelUser = require('../models/user')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')

class userController {
  static create(req, res) {
    let newUser = {
      name: req.body.name,
      image_profil: req.body.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png",
      email: req.body.email,
      password: req.body.password
    }
    modelUser.create(newUser)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static signin(req, res) {
    modelUser.findOne({ email: req.body.email })
      .then(userFound => {
        if (userFound) {
          if (compare(req.body.password, userFound.password)) {
            let token = sign({ _id: userFound._id, name: userFound.name })
            res.status(200).json({ token, userId: userFound._id, userName: userFound.name })
          } else {
            res.status(400).json({ msg: "Bad request" })
          }
        } else {
          res.status(400).json({ msg: "Bad request" })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = userController
