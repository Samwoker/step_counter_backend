const mongoose = require("mongoose");

const connectionSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
        values:["interested", "ignored", "accepted", "rejected"],
        message:`${VALUE} not supported`
        }
    }
},{timestamps:true})

connectionSchema.index({
    fromUserId:1,
    toUserId:1
})

connectionSchema.pre("save",async function(next){
    if(this.fromUserId.equals(toUserId)){
        throw new Error("can't send request to yourself")
    }
    next();
})