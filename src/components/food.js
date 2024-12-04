import React from 'react';
import Recipe from './recipe';
import { useEffect, useState } from "react";
import axios from "axios";

const Food = () => {
    const [recipes, setRecipes] = useState([]);

    const ReloadData = ()=>{
      axios.get('http://localhost:4000/api/recipes')
        .then((response) => {
          console.log(response.data);
          setRecipes(response.data.recipes);
        })
        .catch((error) => {
          console.log(error);
        });
    }

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
      <hr />
      <br></br>
      <div class="header-section">
        <h1>Chicken</h1>
      </div>
      <Recipe myRecipes={recipes} ReloadData={ReloadData} ></Recipe>
    </div>
    
  );
}

export default Food;