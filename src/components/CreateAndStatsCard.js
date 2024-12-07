import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const CreateAndStatsCard = ({ recipes }) => {
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "" });

  // Handle new recipe creation
  const handleCreateRecipe = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/recipes", newRecipe)
      .then((response) => {
        console.log(response.data);
        // Reload recipes after successful addition
        // You could call `ReloadData` or update the state here
      })
      .catch((err) => console.error("Error creating recipe:", err));
  };

  // Prepare data for the pie chart
  const categoryCounts = recipes.reduce((acc, recipe) => {
    recipe.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <h2>Create Recipe & Stats</h2>
      <form onSubmit={handleCreateRecipe}>
        <input
          type="text"
          placeholder="Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
        />
        <button type="submit">Create Recipe</button>
      </form>

      {/* Pie chart for category distribution */}
      <h3>Category Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default CreateAndStatsCard;