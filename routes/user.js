const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { protect } = require("../middleware/auth")

//These are the routes for users to Sign up, Login and request User info

router.post("/", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/getUser", protect, userController.getUser)

module.exports = router