import jwt from "jsonwebtoken";



// ye ek middleware hy jo k hamaray token to user id mei convert kry ga//
// phr us userid ki madad se hum add ,remove, aur get the data from cart kr skty hain
const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false, messsage:"User Not Authorized Login Again"})
    }try{
        const token_decode=jwt.verify(token,process.env.jwt_SECRET);
        req.body.userId=token_decode.id;
        next();
    }catch(error){
        console.log(error);
        res.json({success:false, messsage:"Error"})

    }

}


export default authMiddleware;