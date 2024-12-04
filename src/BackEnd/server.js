const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.uxdft.mongodb.net/DB11'); // Connect to MongoDB database

const recipeSchema = new mongoose.Schema({
  title: String,
  createdYear: Number, 
  description: String,
  poster: String,
  type: String,
  ingredients: String,
  preparation: String,
  prepTime: Number,
  cookTime: Number

});

const recipeModel = new mongoose.model('myRecipes',recipeSchema);

app.get('/api/recipes', async (req, res) => {
  const recipes = await recipeModel.find({});
  res.status(200).json({recipes})
});


  app.get('/api/recipes/:id', async (req ,res)=>{
    const recipe = await movieModel.findById(req.params.id);
    res.json(recipe);
  })

  app.delete('/api/recipes/:id', async(req, res)=>{
    const recipe = await movieModel.findByIdAndDelete(req.params.id);
    res.send(recipe);
  })
  
  app.put('/api/recipes/:id', async (req, res)=>{
    const recipe = await movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
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
  const {title, year,description, type, poster,ingredients,preparation} = req.body;

  const newRecipe = new recipeModel({title, year,description, type, poster,ingredients,preparation});
  await newRecipe.save();

  res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});