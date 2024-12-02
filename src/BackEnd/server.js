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

const movieSchema = new mongoose.Schema({
  title: String,
  year: String, 
  poster: String 
});
const movieModel = new mongoose.model('myMovies',movieSchema);

app.get('/api/movies', async (req, res) => {
    const movies = await movieModel.find({});
    res.status(200).json({movies})
});

app.get('/api/movies/:id', async (req ,res)=>{
    const movie = await movieModel.findById(req.params.id);
    res.json(movie);
  })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/movies',async (req, res)=>{
    console.log(req.body.title);
    const {title, year, poster} = req.body;

    const newMovie = new movieModel({title, year, poster});
    await newMovie.save();

    res.status(201).json({"message":"Movie Added!",Movie:newMovie});
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});