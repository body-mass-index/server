const router = require('express').Router()
const userController = require('../controllers/user')
const gcs = require('../middleware/gcs')

router.post('/signup', gcs.multer.single("image"), gcs.sendUploadToGCS, userController.create)
router.post('/signin', userController.signin)

module.exports = router
