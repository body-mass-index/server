const router = require('express').Router()
const bmiController = require('../controllers/bmi')
const { authentication } = require('../middleware/auth')
const gcs = require('../middleware/gcs')
const saveLocal = require('../middleware/saveToLocal')

router.use(authentication)
router.post('/', saveLocal,gcs.multer.single("image"), gcs.sendUploadToGCS, bmiController.create)
router.get('/', bmiController.findAll)
router.post('/result', bmiController.findResult)

// router.get('/:id', bmiController.findOne)
// router.delete('/:id', bmiController.delete)
// router.put('/:id', bmiController.update)

module.exports = router
