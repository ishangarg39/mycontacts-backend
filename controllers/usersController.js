const asyncHandler=require("express-async-handler");
const User=require("../models/usersModel");
const Bcyrpt=require("bcrypt");
const jwt=require("jsonwebtoken");


//@desc Register User
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
   const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    console.log("usera----")

    const userAvailable = await User.findOne({email});
    console.log("usera----",userAvailable.email)

    if(userAvailable){
        res.status(400)
        throw new Error("User Already Registered");
    }
    else{
        console.log("User Available")
    }

    //Hash Password
    const hashPassword=await Bcyrpt.hash(password,10);
    console.log("hashPassword",hashPassword);

    const user=await User.create({
        username,
        email,
        password:hashPassword
    });
    console.log(user);
    if(user){
        console.log("user",user.username)
        res.status(200).json({_id:user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.status(200).json({message:"register"});
});


//@desc Login User
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
if(!email||!password){
    res.status(400);
    throw new Error("Enter all Details")
}

    const user = await User.findOne({email});
    //Compare password enter with hashed Password
    if(user && (await Bcyrpt.compare(password,user.password))){
        const accesstoken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15m"
        }
        );
        res.status(200).json({accesstoken});
    }
    else
    {
        res.status(401);
        throw new Error("Enter Valid Details");
    }
});

//@desc Current User
//@route GET /api/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser,loginUser,currentUser };