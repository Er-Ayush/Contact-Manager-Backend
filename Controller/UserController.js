const errorHandler=require("../middleware/errorHandler");
const asyncHandler = require("express-async-handler");
const User =require("../Models/UserModel");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);    
        throw new Error("No filed can be empty");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const user= await User.create({
        username,
        email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({
            _id:user.id,
            email:user.email
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({message:"User registered successfully registered"});
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("No filed can be empty");
    }
    const user= await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    );
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("Email or pass is wrong")
    }
    res.json({message:"Login successfully"}); 
});

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser}