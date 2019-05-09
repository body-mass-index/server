const router = require('express').Router()
const user = require('./user')
const bmi = require('./bmi')

router.use('/user', user) 
router.use('/bmi', bmi) 

module.exports = router