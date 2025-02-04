const mongoose=require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name:{
        type:String,
        required : {true: "Please add the Contact Name"}
    },
    email:{
        type:String,
        required : {true: "Please add the Email "}
    },
    phone:{
        type:String,
        required : {true: "Please add the Phone number"}
    }

});

module.exports=mongoose.model("Contact",contactSchema);