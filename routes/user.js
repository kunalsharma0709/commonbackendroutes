const express = require("express");
const USER = require("../db/datab")
const router = express.Router();
const secretpass = require("../secret/sec")
const zod = require("zod");
const jwt = require("jsonwebtoken");
const authMiddleware =require("../middlewares/authentication");

//first route is for the signin purpose

const signinzod = zod.object({
    firstname : zod.string(),
    lastname:zod.string(),
    username:zod.string(),
    password:zod.string().minLength(3)
})


router.post("/signup" , async(req,res)=>{
    const x = req.body;
    const response = signinzod.safeParse(x);
    if(!response.success){
        return res.json({
            msg:"invalid input"
        })
    }
    
    const a = await USER.findOne({
        username:x.username
    })
    
    if(a){
        return res.json({
            msg:"user already exist"
        })
    }

    const b = await USER.create({
        firstname:x.firstname,
        lastname:x.lastname,
        username:x.username,
        password:x.password
    })
    
    const userid  = b._id
    
    const token  = jwt.sign({userid:b._id},secretpass);

    return res.json({
        msg:"signed up successfully" , token
    })
    

})


// second route is for the signup purposes 

const signupzod  = zod.object({
    username :zod.string(),
    password:zod.string()
})


router.post("/signin", async(req,res)=>{
    const x = req.body;
    
    const response = signupzod.safeParse(x);

    if(!response.success){
        return res.json({
            msg:"invalid user details"
        })
    }

    const a = await USER.findOne({
        username:x.username
    })

    if(!a){
        return res.json({
            msg:"user doesnot exist "
        })
    }
    

    const token = jwt.sign({userid:a._id},secretpass);

    return res.json({
        msg:"signedin successfully", token
    })

})

// third  route is for user to gets his information after signedup/signingin

router.get("/getinfo",authMiddleware,async(req,res)=>{
    const userid = req.userid;

  const a =   await USER.findOne({
          _id:userid
    })

    if(!a){
        return res.json({
            msg:"user not find"
        })
    }
    
    return res.json({
        msg:"here your information dude",
        firstname:a.firstname,
       lastname: a.lastname,
       username:a.username
    })

})


// fourth route is to update the user details
// fifth route is to get the user info by userid (both params and the query)
//sixth route is to get the user by there first and lastname (using regex)
