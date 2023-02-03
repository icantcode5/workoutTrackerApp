const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.js')

//Routes to determine which controller gets used
router.get('/home', homeController.getHomePage)



module.exports = router

