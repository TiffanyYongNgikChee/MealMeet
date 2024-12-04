import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

    return (
      <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img
        src={recipe.poster}
        alt={recipe.title}
        className="recipe-image"
      />
      <p className="recipe-description">{recipe.description}</p>
      <p className="recipe-year"><strong>Year Created:</strong> {recipe.year}</p>
      <p className="recipe-categories"><strong>Categories:</strong> {recipe.categories.join(", ")}</p>

      {/* Ingredients Table */}
      <div className="ingredients-section">
        <h2 className="ingredients-title">Ingredients</h2>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Steps Section */}
      <div className="steps-section">
        <h2>Steps</h2>
        <ol className="steps-list">
          {recipe.steps.map((step, index) => (
            <li key={index} className="step-item">
               {step.instruction}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
  
  export default Details;