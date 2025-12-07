const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minLength:3,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        validate:{
            validator(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address")
                }
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator(value){
                if(validator.isStrongPassword(value)){
                    throw new Error("Weak password")
                }
            }
        }
    },
    confirmPassword:{
        type:String,
        trim:true,
        validate:{
            validator:function(value){
                return this.password == value
            },
            message:"Password does not match",
        }
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10)
        user.confirmPassword = undefined
    }
    next()
})

const User = mongoose.model("User",userSchema);
module.exports = User;