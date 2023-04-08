const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    balance:{type:String,required:true,default:'0'},
    aadhar:{type:String,required:true},
    pan:{type:String,required:true},
    kyc:{type:Boolean,required:true,default:false},
    transections:[]
})
const User = mongoose.model("user",userSchema)
module.exports = User