const express = require("express")
const User = require("../models/User.module")
const userRoute = express()
const jwt = require("jsonwebtoken")

userRoute.post("/openAccount",async(req,res)=>{
    try{
        const {email,pan} = req.body;
        let userExists= await User.find({email:email,pan:pan})
        if(userExists.length==0){
            let newUser = new User(req.body)
            let data = await newUser.save()
            //generating token
            const token = await jwt.sign({_id:data._id},"masaischool")
            res.send({token,data})
        }else{
            const token = await jwt.sign({_id:userExists[0]._id},"masaischool")
            res.send({token,data:userExists[0]})
        }
    }catch(err){
        res.status(400).send({msg:"invalid credintials"})
    }
})

userRoute.patch("/updateKYC/:_id",async(req,res)=>{
    try{
        const {_id}= req.params
        let update = await User.findByIdAndUpdate(_id,req.body)        
        res.send(update)
    }catch(err){
        res.status(400).send({msg:"invalid credintials"})
    }
})
userRoute.get("/:_id",async(req,res)=>{
    try{
        const {_id}= req.params
        let update = await User.findByIdAndUpdate({_id:_id})        
        res.send(update)
    }catch(err){
        res.status(400).send({msg:"invalid credintials"})
    }
})
module.exports = userRoute;