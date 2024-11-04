const express = require("express");
const router = express.Router()
const {auth} = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/Profile")

//***************************************************************************************************************************************** */
//                                                        Profile routes
//***************************************************************************************************************************************** */
// Delete User Account
router.delete("/deleteProfile", deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails",function (req,res){ auth, getAllUserDetails})
// Get Enrolled Courses
router.get("/getEnrolledCourses", function (req,res){auth, getEnrolledCourses});
router.put("/updateDisplayPicture", function (req,res){auth, updateDisplayPicture})

module.exports = router