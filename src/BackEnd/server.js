const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require("bcrypt"); //Secures passwords by hashing and verifying them.
const jwt = require("jsonwebtoken"); //Generates and verifies tokens for user authentication.

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
      const verified = jwt.verify(token, "your_secret_key");
      req.user = verified; // Add user details to the request
      next();
  } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
  }
};

// Example of a protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.uxdft.mongodb.net/DB11'); // Connect to MongoDB database

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  }
);

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  categories: [String], // E.g., ["Italian", "Asian"]
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      unit: { type: String },
    },
  ],
  steps: [
    {
      step_number: { type: Number },
      instruction: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});
const userModel = new mongoose.model('myUsers',userSchema);
const recipeModel = new mongoose.model('myRecipes',recipeSchema);

app.get('/api/recipes', async (req, res) => {
  const recipes = await recipeModel.find({});
  res.status(200).json({recipes})
});

app.get('/api/recipes/:id', async (req ,res)=>{
  const recipe = await recipeModel.findById(req.params.id);
  res.json(recipe);
})

app.delete('/api/recipes/:id', async(req, res)=>{
  const recipe = await recipeModel.findByIdAndDelete(req.params.id);
  res.send(recipe);
})
  
app.put('/api/recipes/:id', async (req, res)=>{
  const recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(recipe);
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/api/recipes',async (req, res)=>{
  console.log(req.body.title);
  const {title, year,description, categories, poster,ingredients,steps} = req.body;

  const newRecipe = new recipeModel({title, year,description, categories, poster,ingredients,steps});
  await newRecipe.save();

  res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User successfully registered", User: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

app.get('/api/register', async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({users})
});

app.get('/api/register/:id', async (req ,res)=>{
const users = await userModel.findById(req.params.id);
res.json(users);
})
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_secret_key", // Replace with a strong secret key in an environment variable
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token ,
      username: user.username, // Include username here
      email: user.email,});
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});
app.get('/api/login/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// This route should verify the JWT token sent in the request header
app.get('/api/verify-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, "your_secret_key"); // Use your actual secret key here
    res.status(200).json({ message: "Token is valid", user: verified });
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(400).json({ message: "Invalid token" });
  }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});