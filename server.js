const express=require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv=require("dotenv").config();
const contactRoutes=require("./routes/contactRoutes");
const connectDb = require("./config/dbConnection");

connectDb();
const app=express();

const port=process.env.port || 5000;

app.use(express.json());
app.use('/api/contacts',require("./routes/contactRoutes"));
app.use('/api/users',require("./routes/userRoutes"));

app.use(errorHandler);
// app.get('/api/contacts',(req,res)=>{
//     res.status(200).send("get all contacts");
// })
app.listen(port,()=>{
    console.log(`Server on port ${port}`)
})