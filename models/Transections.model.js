const mongoose = require("mongoose")
const transectionsSchema = mongoose.Schema({
    owner:{type:String,required:true},
    type:{type:String,required:true},
    amount:{type:String,required:true},
    newBalance:{type:String,required:true},
    time:{type:String, default:new Date().toLocaleString()}
})
const Transections = mongoose.model("transection",transectionsSchema)
module.exports = Transections;