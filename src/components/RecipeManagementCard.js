import axios from "axios";
import Recipe from "./recipe";

const RecipeManagementCard = ({ recipes, reloadRecipes }) => {
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/recipes/${id}`)
      .then((response) => {
        console.log("Recipe deleted:", response.data);
        reloadRecipes(); // Re-fetch recipes after deletion
      })
      .catch((err) => console.error("Error deleting recipe:", err));
  };

  const handleEdit = (id) => {
    // Redirect to edit page or show a modal to edit the recipe
    // Example: navigate(`/edit/${id}`);
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