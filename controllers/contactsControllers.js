const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactsModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts=asyncHandler (async (req,res)=>{
   const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private

const createContacts=asyncHandler( async(req,res)=>{
    console.log("Body is",req.body)
    const{name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//@desc get contact
//@route GET /api/contacts/:id
//@access private

const getContact=asyncHandler (async (req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).send(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact=asyncHandler( async (req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't has Permission to Update Contact");
    }

    const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        );
    res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact=asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't has Permission to Delete Contact");
    }

   await Contact.deleteOne();
   console.log("contact")

    res.status(200).json(contact);
});

module.exports={getContacts,createContacts,getContact,updateContact,deleteContact};