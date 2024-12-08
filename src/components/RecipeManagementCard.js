import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeManagementCard = ({ recipes, reloadRecipes }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // Optimistically remove the recipe from the UI
    const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
    reloadRecipes(updatedRecipes); // Update the state with the removed recipe

    // Send delete request to the backend
    axios
      .delete(`http://localhost:4000/api/recipes/${id}`)
      .then((response) => {
        console.log("Recipe deleted:", response.data);
        // Navigate to the Food page after successful deletion
        navigate("/food");  // Change this to the correct path to your food.js component
      })
      .catch((err) => {
        console.error("Error deleting recipe:", err);
        // If there's an error, re-add the recipe back to the UI
        // You might want to fetch the recipe again from the backend or revert it
        const originalRecipe = recipes.find((recipe) => recipe._id === id);
        reloadRecipes([...updatedRecipes, originalRecipe]);
      });
  };

  const handleEdit = (id) => {
    // Navigate to the edit page for the specific recipe
    navigate(`/edit/${id}`);
  };

  return (
    <div className="card">
      <h2>Manage Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <span>{recipe.title}</span>
            <button onClick={() => handleEdit(recipe._id)}>Edit</button>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeManagementCard;
