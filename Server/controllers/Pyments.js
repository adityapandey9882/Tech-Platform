const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollment} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initiate the Razorpay order
exports.capturePayment = async(req, res) =>{
    //get courseId and UserID
    const {course_id} = res.body;
    const userId = req.user.id;
    //validation
    if(!course_id){
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    };
    //valid courseDetail
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:'Could not find the course',
            });
        }
        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsErolled.includes(uid)) {
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.order.create(options);
        console.log(paymentResponse)
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message,
        })
    }
};