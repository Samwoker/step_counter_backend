const mongoose = require("mongoose");

const stepsSchema = mongoose.Schema({
    steps:{
        type:number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    day:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

stepsSchema.index({
    userId:1,
    day:1
},{unique:true})

const Steps = mongoose.model("Steps",stepsSchema)

module.exports = Steps