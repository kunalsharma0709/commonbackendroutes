
const jwt = require("jsonwebtoken")
const secretpass = require("../secret/sec")

function authMiddleware(req,res,next){

    const authtoken = req.headers.authorization;
    
    if(!authtoken || !authtoken.startsWith("Bearer ")){
        return res.json({
            msg:"invalid authentication token"
        })
    }

    const token = authtoken.split(" ")[1];

    const decoded = jwt.verify(token,secretpass);

    req.userid = decoded.userid
    
    next()

}

module.exports= authMiddleware;

