const express = require("express")
const router = express.Router()
const testController = require("../controllers/test.js")

router
.get("/", testController.getHome)

module.exports = router