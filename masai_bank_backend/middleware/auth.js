const jwt = require("jsonwebtoken")
const authUser = async(req,res,next)=>{
try{
    let token = req.headers.authorization.split(' ')[1];
    let user = jwt.decode(token,"masaischool")
    req.body={...req.body,owner:user._id}
    next()
}catch(err){
    res.status(401).send({msg:'unauthorized user'})
}
}
module.exports = authUser