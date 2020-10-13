const express = require("express")
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const PORT = 3000;


const keys = require("./jwtkey")
const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use("/api/employee",employeeRoutes);
app.use("/api/user",userRoutes);

app.listen(PORT, (err)=>{
    if(!err){
        console.log("Running on http://localhost:"+PORT)
    }
})