const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require("bcrypt"); //Secures passwords by hashing and verifying them.
const jwt = require("jsonwebtoken"); //Generates and verifies tokens for user authentication.

const cors = require('cors'); // Use CORS middleware to allow cross-origin requests
app.use(cors());

const bodyParser = require('body-parser');  // Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware function to authenticate JWT token in protected routes
const authenticateToken = (req, res, next) => {
const token = req.headers['authorization']; // Get the token from the authorization header
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
      const verified = jwt.verify(token, "your_secret_key"); // Verify the token using a secret key
      req.user = verified; // Add user details to the request
      next();
  } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
  }
};

// Protected route that requires token authentication
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

// MongoDB connection and models
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.uxdft.mongodb.net/DB11'); // Connect to MongoDB database

// Define the user schema for MongoDB
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

// Define the recipe schema for MongoDB
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
// Create models for User and Recipe collections
const userModel = new mongoose.model('myUsers',userSchema);
const recipeModel = new mongoose.model('myRecipes',recipeSchema);

// Route to get all recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await recipeModel.find({}); // Retrieve all recipes from the database
  res.status(200).json({recipes}) // Return the recipes as a JSON response
});

// Route to get a specific recipe by ID
app.get('/api/recipes/:id', async (req ,res)=>{
  const recipe = await recipeModel.findById(req.params.id); // Find a recipe by its ID
  res.json(recipe); // Return the recipe
})

// Route to delete a recipe by ID
app.delete('/api/recipes/:id', async(req, res)=>{
  const recipe = await recipeModel.findByIdAndDelete(req.params.id);
  res.send(recipe);
})

// Route to update a recipe by ID
app.put('/api/recipes/:id', async (req, res)=>{
  const recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(recipe);
})

// Middleware for CORS headers to allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route to create a new recipe
app.post('/api/recipes',async (req, res)=>{
  console.log(req.body.title);
  const {title, year,description, categories, poster,ingredients,steps} = req.body;

  const newRecipe = new recipeModel({title, year,description, categories, poster,ingredients,steps});
  await newRecipe.save();

  res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})

// Route for user registration
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

    // Create a new user and save to the database
    const newUser = new userModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User successfully registered", User: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Route to get all users (for admin use or debugging)
app.get('/api/register', async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({users})
});

// Route to get user details by ID
app.get('/api/register/:id', async (req ,res)=>{
const users = await userModel.findById(req.params.id);
res.json(users);
})

// Route for user login
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

// Route to get user details by username
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

/// Route to verify JWT token validity
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});