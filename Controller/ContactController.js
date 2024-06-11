const errorHandler=require("../middleware/errorHandler");
const asyncHandler = require("express-async-handler");
const Contact=require("../Models/ContactModel");


const getContacts= asyncHandler(async (req,res)=>{
    const contacts =await Contact.find({user_id:req.user.id});  
    res.status(200).json(contacts);
});


const createContact=asyncHandler(async (req,res)=>{
    // console.log(req.body.name,req.body.email);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("No filed can be empty");
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user.id});
    res.status(201).json(contact);
});


const getContact = asyncHandler(async (req, res) => {
    let contact = null;
  
    try {
      contact = await Contact.findById(req.params.id);
  
      if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
      }
  
      res.status(200).json(contact);
    } catch (error) {
      // make sure to handle the error and send a response
      res.status(500).json({ message: error.message });
    }
  });


const updateContacts=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
      res.status(401);
      throw new Error("Not authorized");
    }
    const updatedcontact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedcontact);
});


const deleteContacts=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
      res.status(401);
      throw new Error("Not authorized");
    }
    await contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});


module.exports={getContacts,createContact,getContact,updateContacts,deleteContacts};