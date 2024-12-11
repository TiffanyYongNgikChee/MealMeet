import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeItem from "./recipeItem";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestRecipes, setLatestRecipes] = useState([]);

  // Array of images and descriptions
  const slides = [
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/317A0175.jpg_C6H6CW?tr=w-600", title: "Panettone Pistachio Bread Pudding", description: "Gifted a panettone and you don't know what to do with it? Make this! Gooey panettone bread and butter pudding, pistachio cream, dark chocolate, and chopped pistachios for the ultimate festive pudding." },
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/317A0090.jpg_3RnmJm?tr=w-600", title: "Smoked Salmon Potato Pancake", description: "This is kind of like a cross between a rosti and a latke, but giant! Topped with creme fraiche, smoked salmon, and fresh herbs, this is the perfect sharer for Christmas morning!" },
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/balls.jpg_aVzNKO?tr=w-600", title: "Stuffing Balls & Cheat's Gravy Dip", description: "This recipe rectifies this egregious error and brings them centre stage. Sausage meat, roasted chestnuts, orange zest - the gang are back together!" },
  ];
  // Fetch the latest recipes
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/recipes")
      .then((response) => {
        const recipes = response.data.recipes;
        // Sort recipes by createdAt in descending order
        const sortedRecipes = recipes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Select the top 6 recipes
        setLatestRecipes(sortedRecipes.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching latest recipes:", error);
      });
  }, []);

  // Carousel rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      {/* Poster Carousel */}
      <div className="poster-carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          >
            <div className="carousel-description">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
            <div
              className="carousel-image"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          </div>
        ))}
      </div>

      {/* Latest Recipes Section */}
      <h2 className="home-title">Latest Recipes</h2>
      <div className="latest-recipes-grid">
        {latestRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-item">
            <Link to={`/details/${recipe._id}`}>
              <img
                src={recipe.poster}
                alt={recipe.title}
                className="recipe-image-home"
              />
            </Link>
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <p>
                {recipe.description.length > 100
                  ? `${recipe.description.substring(0, 100)}...`
                  : recipe.description}
              </p>
              <small className="text-muted">
                Year Created: {new Date(recipe.createdAt).getFullYear()}
              </small>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default Home;