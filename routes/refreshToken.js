const express = require("express")
const router = express.Router()
const refreshTokenController = require("../controllers/refreshToken")
const { protect } = require("../middleware/auth")

//Routes to determine which controller gets used
//prettier-ignore
router.post("/", protect, refreshTokenController.getRefreshToken)

module.exports = router
