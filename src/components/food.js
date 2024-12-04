import React from 'react';
import Recipe from './recipe';
import { useEffect, useState } from "react";
import axios from "axios";

const Food = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([
      "Spicy", "Chicken", "Italian", "Asian", "Western", "Vegan", "Dessert"
    ]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const ReloadData = ()=>{
      axios.get('http://localhost:4000/api/recipes')
        .then((response) => {
          console.log(response.data);
          setRecipes(response.data.recipes);
          // Extract categories from the recipes
          const allCategories = new Set();
          response.data.forEach(recipe => {
            recipe.categories.forEach(category => allCategories.add(category));
          });
          setCategories([...allCategories]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Filter recipes by selected category
    const filteredRecipes = selectedCategory === "All" 
      ? recipes 
      : recipes.filter(recipe => recipe.categories.includes(selectedCategory));


    useEffect(() => {
      ReloadData();
    },[]);
  return (
    <div class="header">
      <div class="images">
      <img src="https://twistedfood.s3.us-west-1.amazonaws.com/images/stove.svg" alt="Left Header Image"/>
       <span class="app-name">MealMeet</span>
       <img src="https://twistedfood.s3.us-west-1.amazonaws.com/images/pot.svg" alt="Right Header Image"/>
      </div>
      <div class="description">Need some recipe inspiration? Browse our complete list of Twisted recipes, delicious meals and dinner ideas from our kitchen to yours, to fit every palate, dietary requirement and taste.</div>
      {/* Category Selector */}
      <div className="category-selector">
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="All">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <hr />
      <br></br>
        

      {/* Display Recipes Based on Selected Category */}
      <div className="header-section">
        <h1>{selectedCategory} Recipes</h1>
      </div>

      {/* Recipe Component */}
      <Recipe myRecipes={filteredRecipes} ReloadData={setRecipes} />
    </div>
    
  );
}

export default Food;