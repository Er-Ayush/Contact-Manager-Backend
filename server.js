const express = require("express");
const dotenv = require("dotenv").config();
const app=express();
const errorHandler=require("./middleware/errorHandler");
const connectDB = require("./Config/DbConnection");
const port=process.env.PORT || 5000;

connectDB();
// middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/UserRoutes.js"));
app.use(errorHandler);
// app.get('/api/contacts/get-contects',(req,res)=>{
//     res.status(200).json({"message":"Hello"});
// });

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

