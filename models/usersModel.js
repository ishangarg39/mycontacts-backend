const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add the username"]
    },
    email: {
        type: String,
        require: [true, "Please add the email Id"],
        unique:[true,"Email already exists"]
    },
    password: {
        type: String,
        require: [true, "Please add the phone Number"]
    }
},
    {
        timestamps: true
    });

    module.exports=mongoose.model("user", userSchema);