const Category = require("../models/Category");
const Tag = require("../models/Category");

//create category ka handler function
exports.createCategory = async( req, res) => {
    try {
        //fetch data 
        const {name, description} = req.body;
        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//getAllCategories handler function]
exports.showAllCategories = async(req, res) =>{
    try{
        const allCategory = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All Category return successfully",
            allTags,    
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//categoryPageDetails

exports.categoryPageDetails = async(req, res) => {
    try{
        //get categoryId 
        const {categoryId} = req.body;
        //get courses for specified categories
        const selectedCotegory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCotegory) {
            return res.status(404).json({
                success:false,
                message:'Data Not found',
            })
        }
        //get courses for different categories
        const differentCategories = await Category.find({
                                        _id: {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        //get top selling courses
        //HW - write it on your own

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCotegory,
                differentCategories,
            },
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}