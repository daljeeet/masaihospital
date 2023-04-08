const express = require("express")
const transRoute = express()
const Transections = require("../models/Transections.model")
const User = require("../models/User.module")

transRoute.post("/depositMoney",async(req,res)=>{
try{
    let {owner,amount} = req.body;
    let userExist = await User.findById({_id:owner})
    if(userExist){
        let bal= ((+userExist.balance)+(+amount)).toString()
       await User.findByIdAndUpdate(owner,{balance:bal})
       let newTransection = {...req.body,newBalance:(+userExist.balance)+(+amount)}
        let newTrans = new Transections(newTransection)
       let newTransec =  await newTrans.save()
       res.send(newTransec)
    }else{
        throw 'error'
    }
}catch(err){
    console.log(err)
    res.status(400).send("not updated")
}
})
transRoute.post("/withdrawMoney",async(req,res)=>{
try{
    let {owner,amount} = req.body;
    let userExist = await User.findById({_id:owner})
    if(userExist){
        if(userExist.balance<amount){
            throw "low balance"
        }else{
            let bal= ((+userExist.balance)-(+amount)).toString()
            await User.findByIdAndUpdate(owner,{balance:bal})
            let newTransection = {...req.body,newBalance:(+userExist.balance)-(+amount)}
            let newTrans = new Transections(newTransection)
            let newTransec =  await newTrans.save()
            res.send(newTransec)
        }
    }else{
        throw 'user Not found'
    }
}catch(err){
    res.status(400).send('error')
}
})
transRoute.post("/transferMoney",async(req,res)=>{
try{
    let {owner,amount} = req.body;
    let userExist = await User.findById({_id:owner})
    if(userExist){
        if(userExist.balance<amount){
            throw "low blance"
        }else{
            let bal= ((+userExist.balance)-(+amount)).toString()
            await User.findByIdAndUpdate(owner,{balance:bal})
            let newTransection = {...req.body,newBalance:(+userExist.balance)-(+amount)}
            let newTrans = new Transections(newTransection)
            let newTransec =  await newTrans.save()
            res.send(newTransec)
        }
    }else{
        throw 'error'
    }

}catch(err){
    res.status(400).send('error')
}
})

transRoute.get("/printStatement",async(req,res)=>{
try{
    let allTransections = await Transections.find({owner:req.body.owner})
    res.send(allTransections)
}catch(err){
    res.status(400).send('error')
}
})

module.exports = transRoute;