
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// app config
const app =express()
const port=4000

// middleware
app.use(express.json())
app.use(cors(
     {
          origin:["https://Food-order-1whq.vercel.app"],
          methods:["POST","GET"],
          credentials:true
     }
            ));

// dB connection

connectDB();

//api end points

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
// app.use ("/api/order",orderRouter)

app.get("/",(req,res)=>{
     res.send("API working")
})

app.listen(port,()=>{
    console.log(`server starting at  http://localhost:${port}`)
})



