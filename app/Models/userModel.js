const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    title:{
        type:String,
        // require:true
    },
    videos:[
        {type:String}
    ]
}) 
module.exports=mongoose.model("User",UserSchema);