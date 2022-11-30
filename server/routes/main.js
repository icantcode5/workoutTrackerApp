const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.js')

//Routes to determine which controller gets used
router.get('/home', homeController.getHomePage)
router.post('/home/createWorkout', homeController.createWorkout)
router.get('/viewWorkouts', homeController.getWorkouts)



module.exports = router

