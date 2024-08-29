import express from "express";
 
 
import bodyParser from "body-parser";
import cors from "cors";
import route from "./src/route.js"
import connectToDatabase from "./dbconnection.js";
 import dotenv from "dotenv";
dotenv.config();
const app = express();



app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
 
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



 
 
 

app.use("/api/v1",route);
 

 
 
 //2HFk3U1p1ErVzsJP
 
 
 
 
app.get('/checking', (req, res) => {
    res.send('Api route checking........');
});

 
 
app.listen(process.env.PORT || 5000,()=>{
  connectToDatabase()
    console.log("server is runnung on port 5000");
    console.log("done");
})