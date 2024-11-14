import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://sheikhyasircaa:03353646139@cluster0.vyg6b.mongodb.net/food-del?retryWrites=true&w=majority').then(()=>console.log("Db connected"));
}
