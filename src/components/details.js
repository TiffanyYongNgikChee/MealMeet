import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Details = (props) => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get(`http://localhost:4000/api/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

    return (
      <div> <button
    onClick={() => navigate('/food')} // Navigates back to the recipes page
    className="btn btn-secondary mb-4">
    Back to Recipes
  </button>
      <div className="recipe-details-container">
  {/* Back to Recipes Button */}
 
      
  {/* First Row */}
  <div className="recipe-title-description">
    <h1 className="recipe-title">{recipe.title}</h1>
    <p className="recipe-description">{recipe.description}</p>
  </div>

  {/* First Row, Second Column (Image) */}
  <div className="recipe-image-container">
    <img
      src={recipe.poster}
      alt={recipe.title}
      className="recipe-image"
    />
  </div>

  {/* Second Row */}
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

  {/* Second Row, Second Column (Steps) */}
  <div className="steps-section">
    <h2 className="steps-title">Steps</h2>
    <ol className="steps-list">
      {recipe.steps.map((step, index) => (
        <li key={index} className="step-item">
          {step.instruction}
        </li>
      ))}
    </ol>
  </div>
</div>
<p>Created Time {recipe.createdAt}</p>

</div>
  );
};
  
  export default Details;