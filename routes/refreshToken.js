const express = require("express")
const router = express.Router()
const refreshTokenController = require("../controllers/refreshToken")
const { protect } = require("../middleware/auth")

//Routes to determine which controller gets used
//prettier-ignore
router.get("/", refreshTokenController.getRefreshToken)

module.exports = router

// MAY NEED TO CHANGE AUTH MIDDLEWARE TO CHECK FOR REFRESHTOKEN ONLY AND NOT ACCESS TOKEN SINCE IT WOULD BE EXPIRED IN ORDER TO PROTECT THE CREATE A NEW ACCESS TOKEN ROUTE.
