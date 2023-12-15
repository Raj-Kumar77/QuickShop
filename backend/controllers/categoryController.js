import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create-category
export const createCategoryController = async(req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(200).send({
            success: true,
            message: 'new category created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in category',
            error
        })
    }
};

// update category 
export const updateCategoryController = async(req,res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success: true,
            message: 'category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updating category',
            error
        })
    }
}

// get all category 
export const getAllCategoryController = async(req,res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'all category list',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting all category',
            error
        })
    }
}

// get single category 
export const getSingleCategoryController = async(req,res) =>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "get single category successfull",
            category
        })
    } catch (error) {
     console.log(error)
     res.status(500).send({
        success: false,
        message: 'error while getting single category',
        error
     })   
    }
}


// delete category
export const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'category deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while deleating category',
            error
        })
    }
}

export default createCategoryController;