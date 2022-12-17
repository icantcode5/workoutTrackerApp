const express = require('express')
const router = express.Router()
const workoutController = require("../controllers/workout.js")
const { protect } = require("../middleware/auth")


router.post('/createWorkout', protect, workoutController.createWorkout)
router.get('/viewWorkouts', protect, workoutController.getWorkouts)
router.get('/editWorkout/:id', workoutController.getWorkout)
router.delete('/deleteWorkout/:id', workoutController.deleteWorkout)
router.put('/editWorkout/:id', workoutController.updateWorkout)


module.exports = router 