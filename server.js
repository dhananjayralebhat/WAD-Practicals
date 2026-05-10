const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/assignment2c")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// CREATE
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.send({
    message: "User Registered Successfully"
  });
});


// READ
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});


// UPDATE
app.put("/update/:id", async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send({
    message: "User Updated Successfully",
    user
  });
});


// DELETE
app.delete("/delete/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.send({
    message: "User Deleted Successfully"
  });
});


// LOGIN
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
    password: password
  });

  if(user){
    res.send({
      message: "Login Successful",
      user
    });
  }
  else{
    res.send({
      message: "Invalid Email or Password"
    });
  }
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});

//npm init -y
//npm install express mongoose cors body-parser
