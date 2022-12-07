const express = require('express')
const router = express.Router()
const workoutController = require("../controllers/workout.js")


router.post('/createWorkout', workoutController.createWorkout)
router.get('/viewWorkouts', workoutController.getWorkouts)
router.get('/editWorkout/:id', workoutController.getWorkout)
router.delete('/deleteWorkout/:id', workoutController.deleteWorkout)
router.put('/editWorkout/:id', workoutController.updateWorkout)


module.exports = router 