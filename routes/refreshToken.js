const express = require("express")
const router = express.Router()
const refreshTokenController = require("../controllers/refreshToken")
const { protect } = require("../middleware/auth")

//Routes to determine which controller gets used
router.post("/storeRefreshToken", refreshTokenController.storeRefreshToken)

module.exports = router
