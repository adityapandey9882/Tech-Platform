// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature} = require("../controllers/Pyments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment",function (req,res){ auth, isStudent, capturePayment})
router.post("/verifySignature",function (req,res){ verifySignature})

module.exports = router