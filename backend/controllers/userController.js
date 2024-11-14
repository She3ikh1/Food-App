import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config'

//login user

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User' doesn't exists in our databse"})
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token= createToken(user._id);
        res.json({success:true,token})


    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }


}

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//resgister user //


const registerUser = async (req, res) => {
    // extracting the required fields from the request body
    const { name, password, email } = req.body;
    
    try {
          // check if all required fields are provided
        //   if (!name || !email || !password) {
        //     return res.json({ success: false, message: "All fields are required" });
        // }
        
        // check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        // validating email format and password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a new user document
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // saving the user to the database
        const user = await newUser.save();

        // generating a token
        const token = createToken(user._id);
        
        // sending success response with the token
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:error });
    }
};


export {loginUser,registerUser}