const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required: [true, "Please add the User name"]
    },
    email:{
        type:String,
        required: [true, "Please add the Email"],
        unique: [true, "Email address already taken up"]
    },
    password:{
        type: String,
        required: [true, "Please add the User password"]
    },
},{
    timestamps: true,
});

module.exports=mongoose.model("User",userSchema);