const express=require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/usersController");
const validateToken = require("../middlewares/validateTokenHandeler");
const router=express.Router();
router.post("/register",registerUser);


router.post("/login",loginUser)


router.get("/current",validateToken , currentUser)

module.exports=router;