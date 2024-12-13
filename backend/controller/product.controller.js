import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProducts = async(_req,res) => {
    try {
        const products =await Product.find({});
        res.status(200).json({ success:true,data: products });
    } catch(error){
        console.log("error in fetching products", error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}
export const postProducts =  async(req, res) => {
    const product = req.body;

    if(!product.name|| !product.price || !product.image){
        return res.status(400).json({success:false,message: "please enter all fields"});
}
const newProduct = new Product(product)

try {
    await newProduct.save();
    res.status(201).json({ success: true, data :newProduct});

}
catch(error){
    console.error("error in creation:",error.message);
    res.status(500).json({success:false, message:"Server Error"});
}
}

export const updateProduct = async (req,res) => {
    const{ id } =req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.sendStatus(404).json({success: false,message: "invaild Product Id"});
    }
    
    try {
        const updateProduct= await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({ success: true, data: updateProduct })
    } catch(error){
        res.status(500).json({ success: false, message:"server error" })
    }
}
 
export const deleteProduct = async (req, res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.sendStatus(404).json({success: false,message: "invaild Product Id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"product deleted"})
    }catch(error){
        res.status(500).json({success:false, message:"local server error"})
    }
}