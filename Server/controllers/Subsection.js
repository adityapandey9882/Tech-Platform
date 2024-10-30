const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create SubSection

exports.createSubSection = async(req, res) => {
    try{
        //fetch data from Req body
        const {sectionId, title, timeDuration, description} = req.body;
        //extract file/video
        const video = req.file.videoFile;
        //validation
        if(!sectionId | !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //update video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        
        // Update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, // Correctly pass the sectionId as the first parameter
                                                     { $push: { 
                                                        subSection: subSectionDetails._id
                                                     }}, // Update object as the second parameter
                                                     { new:true}); // Options as the third parameter
        
        //return response
        return res.status(200).json({
            success:true,
            message:'Sub Section Created successfully',
            updatedSection,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
