const express  = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const transRoute = require("./routes/TransectionsRoute")
const authUser = require("./middleware/auth")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/user",userRoute)
// middleware
app.use("/transection",authUser)
app.use("/transection",transRoute)

const port = 5000;
app.listen(port,async()=>{
    try{
        console.log('server is running at port',port)
        mongoose.connect("mongodb+srv://daljeet:daljeet@cluster0.q39nzhs.mongodb.net/masai_hospital?retryWrites=true&w=majority")
        console.log('connected to db')
    }catch(err){
        console.log("some error occred")
    }
})