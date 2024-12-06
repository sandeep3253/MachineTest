const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt=require("bcryptjs");
const User = require("./models/User");
const app = express();


connectDB().then(()=>{
    console.log("Database is established");
    app.listen(7777,()=>{
        console.log("server sucessfully established");
    });
 }).catch((err)=>{
    console.log("Database cannot be connected");
 });


app.use(express.json());
app.post("/signup", async (req, res) => {
    const { username, email, password, gender } = req.body;
  
    // Validate input
    if (!username || !email || !password || !gender) {
      return res.status(400).send("All fields are required");
    }
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).send("User already exists");
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        gender,
      });
  
      await user.save();
      res.status(201).send("User added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
});
    app.get("/user",async(req,res)=>{
        const userEmail = req.body.email;
        try{
            const user = await user.find({email:userEmail});
            res.send(user);
        }catch(err){
            res.status(400).send("something went wrong");
        }
    });
  
  app.get("/feed",async(req,res)=>{
     try{
         const users = await user.find({});
         res.send(users);
     }catch(err){
         res.status(404).send("something went wrong");
     }
  });


