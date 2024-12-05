import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/favorites/${user._id}`);
        setFavoriteRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.username}</h2>
      <div style={{ marginTop: "20px" }}>
        <h3>Your Favorite Recipes</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {favoriteRecipes.map((recipe) => (
            <div
              key={recipe._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                width: "250px",
              }}
            >
              <img
                src={recipe.poster}
                alt={recipe.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h4>{recipe.title}</h4>
              <Link to={`/details/${recipe._id}`} className="btn btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Add Your Own Recipe</h3>
        <Link to="/create" className="btn btn-primary">
          Create Recipe
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
