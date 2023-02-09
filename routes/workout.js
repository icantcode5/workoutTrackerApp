const express = require("express")
const router = express.Router()
const workoutController = require("../controllers/workout.js")
const { protect } = require("../middleware/auth")

router.post("/createWorkout", protect, workoutController.createWorkout)
router.get("/viewWorkouts", protect, workoutController.getWorkouts)
router.get("/editWorkout/:id", protect, workoutController.getWorkout)
router.delete("/deleteWorkout/:id", protect, workoutController.deleteWorkout)
router.put("/editWorkout/:id", protect, workoutController.updateWorkout)

module.exports = router
