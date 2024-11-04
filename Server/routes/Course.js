// Import the required modules 
const express = require("express")
const router = express.Router()

// Import the Controllers

//Course Controllers Import 
const {
    creteCourse,
    getAllCourses,
    getCourseDetails,
} = require("../controllers/Course")

// Categories Controllers Import 
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import 
const { 
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")

// Sub-Section Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")

// Ratiing Controller Import 
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

//                                                course routes

// Courses can only be Created by Instructor
router.post("/createCourse", function (req,res){auth, isInstructor, creteCourse})
// Add  a Section to a Course
router.post("/addSection", function (req,res){auth, isInstructor, createSection})
// Update a Section 
 router.post("/updateSection", function (req,res){auth, isInstructor, updateSection})
 // Delete a Section
 router.post("/deleteSection", function (req,res){auth, isInstructor, deleteSection})
 // Edit Sub Section
 router.post("updateSubSection", function (req,res){auth, isInstructor, updateSubSection})
 // Delete Sub Section
 router.post("/deleteSubSection", function (req,res){isInstructor, deleteSubSection})
 // Add a Sub Section to a Section
 router.post("/addSubSection", function (req,res){isInstructor, createSubSection})
 // Get all Registered Courses
 router.get("/getAllCourses", function (req,res){getAllCourses})
 // Get Details for a Specific Courses
 router.post("/getCourseDetails", function (req,res){getCourseDetails})

//************************************************************************************************************************************** */
//                                               
//************************************************************************************************************************************** */
router.get("/showAllCotegories", function (req,res){showAllCategories})
router.post("/getCategoryPageDetails", function (req,res){categoryPageDetails})

//**********************************************************************************************************************
//                                                   Rating and Review
//**********************************************************************************************************************/
router.post("/createRating",function (req,res){ auth, isStudent, createRating})
router.get("/getAverageRating", function (req,res){getAverageRating})
router.get("/getReview", function (req,res){getAllRating})

module.exports = router