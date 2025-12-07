
const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authRouter = express.Router()

authRouter.post("/signup",async(req,res)=>{
    const {username,email,password,confirmPassword} = req.body;
    if(!username | !email | !password | !confirmPassword) {
        throw new Error("Missing fields")
    }
    const ExistingUser = await User.findOne({email})
    if(ExistingUser) res.status(403).json({message:"User already exists"})
    const passwordHash = await bcrypt.hash(password,10);
    const user = User({
        username,
        email,
        password:passwordHash
    })
 await user.save()

    res.status(201).json({message:"User created successfully",data:{
        user
    }})

})

authRouter.post("/signin",async(req,res)=>{
    try {
        const {email,password} = req.body;
        if (!email | !password){
            throw new Error("Missing credentials")
        }
        console.log(email,password)
        const user = await User.findOne({email})
        console.log(user)
        if(!user) throw new Error("User not found")
        const isMatch = bcrypt.compare(password,user.password) 
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await jwt.sign({id:user._id},"process.env.JWT_SECRET",{expiresIn:"7d"})  
        res.cookie("token",token,{expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), })
        console.log(token)
        res.json({user:user,token})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = authRouter