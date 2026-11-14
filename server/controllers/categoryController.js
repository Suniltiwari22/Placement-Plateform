import Category from "../models/Category.js";

//Create category
export const createCategory=async (req,res)=>{
    try {
        const {name,slug,description,icon}=req.body;
        if(!name || !slug){
            return res.status(400).json({
                message:"Name and slug are required"
            });
        }

        const existingCategory=await Category.findOne({
            $or:[
                {name:name},
                {slug:slug}
            ]
        });
        
        if(existingCategory){
            return res.status(409).json({
                message:"Category already exists"
            });
        }

        const category=await Category.create({
            name,
            slug,
            description,
            icon
        });
        res.status(201).json({
            message:"Category ccreated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message:"Error Creating Category",
            error:error.message
        });
    }
};

//Get all category
export const getCategory= async (req,res)=>{
    try {
        const categories=await Category.find().sort({createdAt:-1});
        res.status(200).json({

            count:categories.length,
            categories
        });
    } catch (error) {
        res.status(500).json({
            message:"Error fetching categories",
            error:error.message
        });
    }
};

//get Single Category
export const getCategoryById=async (req,res)=>{
    try {
        const category= await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({
                message:"Category not found"
            });
        }
        res.status(200).json({
            category
        });

    } catch (error) {
        res.status(500).json({
            message:"Error fetching category",
            error:error.message
        });
    }
};

//Update category
export const updateCategory=async (req,res)=>{
    try {
        const {name,slug,description,icon,isActive}=req.body;
        const category=await Category.findByIdAndUpdate(
            req.params.id,
            {
                name,
                slug,
                description,
                icon,
                isActive
            },
            {
                new:true,
                runValidators:true
            }
        );
        if(!category){
            return res.status(404).json({
                message:"Category not found"
            });
        }
        res.status(200).json({
            message:"Category update successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message:"Error update category",
            error:error.message
        });
    }
};

//Delete category
export const deleteCategory = async (req,res)=>{
      try {
        const category=await Category.findByIdAndDelete(
            req.params.id
        );
        if(!category){
            return res.status(404).json({
                message:"category not found"
            });
        }
        res.status(200).json({
            message:"Category deleted successfully "
        });

      } catch (error) {
        res.status(500).json({
            message:"category deleted successfully",
            error:error.message
        });
      }
};