import React from 'react';
import Recipe from './recipe';
import { useEffect, useState } from "react";
import axios from "axios";

const Food = () => {
    const [recipes, setRecipes] = useState([]);

    const ReloadData = ()=>{
      axios.get('http://localhost:4000/api/movies')
        .then((response) => {
          console.log(response.data);
          setRecipes(response.data.movies);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
      ReloadData();
    },[]);
  return (
    <div>
      <h1>Hello From food</h1>
      <Recipe myRecipes={recipes} ReloadData={ReloadData} ></Recipe>
    </div>
  );
}

export default Food;