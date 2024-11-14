
import foodModel from '../models/foodModel.js';
import fs from 'fs';
//add food

const addFood =async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    //
    // const { name, description, price, category } = req.body;
    // if (!name || !description || !price || !category) {
    //     return res.status(400).json({ message: 'All fields are required.' });
    // }
    // //

    // const food =new foodModel({
    //     name,       // String
    //     description, // String
    //     price,       // Number
    //     category     // String
    // });
    const food = new foodModel ({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true, message:"Food Added"})
         console.log("added");
    }catch(error){

        console.log(error)
        res.json({success:false,message:"Error"})
    };
    
}

// all food list

const listFood=async(req,res)=>{
    try{
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})

    }catch(error){
        console.log(error)
    }
}

//remove food itme


const removeFood = async(req,res)=>{
    try{
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}
export {addFood,listFood,removeFood}