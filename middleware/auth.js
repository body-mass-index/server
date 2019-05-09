const User = require('../models/user')
const { verify } = require('../helpers/jwt')

function authentication(req, res, next) {
    let decoded = verify(req.headers.token);
    User.findOne({ _id: decoded._id })
        .then(userFound => {
            if (userFound) {
                req.userId = userFound._id
                next()
            } else {
                res.status(401).json({ message: 'Unauthorized' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Unauthorized' })
        })

}

module.exports = { authentication }
