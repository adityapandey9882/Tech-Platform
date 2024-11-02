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
router.post("/createCourse", auth, isInstructor, creteCourse)
// Add  a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section 
 router.post("/updateSection", auth, isInstructor, updateSection)
 // Delete a Section
 router.post("/deleteSection", auth, isInstructor, deleteSection)
 // Edit Sub Section
 router.post("updateSubSection", auth, isInstructor, updateSubSection)
 // Delete Sub Section
 router.post("/deleteSubSection", isInstructor, deleteSubSection)
 // Add a Sub Section to a Section
 router.post("/addSubSection", isInstructor, createSubSection)
 // Get all Registered Courses
 router.get("/getAllCourses", getAllCourses)
 // Get Details for a Specific Courses
 router.post("/getCourseDetails", getCourseDetails)

//************************************************************************************************************************************** */
//                                               
//************************************************************************************************************************************** */
router.get("/showAllCotegories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

//**********************************************************************************************************************
//                                                   Rating and Review
//**********************************************************************************************************************/
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReview", getAllRating)

module.exports = router