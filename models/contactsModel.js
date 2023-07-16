const mongoose = require("mongoose");

const contactScehna = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    name: {
        type: String,
        require: [true, "Please add the name"]
    },
    email: {
        type: String,
        require: [true, "Please add the email Id"]
    },
    phone: {
        type: String,
        require: [true, "Please add the phone Number"]
    }
},
    {
        timestamps: true
    });

    module.exports=mongoose.model("contact", contactScehna);