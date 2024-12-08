import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import RecipeManagementCard from "./RecipeManagementCard";

const Dashboard = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [chartData, setChartData] = useState(null); // State for graph data

  const navigate = useNavigate();

  // Handle the "Create" button click event to navigate to the /create page
  const handleCreateClick = () => {
    navigate('/create');
  };

  // If not logged in, navigate to login page
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/login");
      return;
    }

    const username = localStorage.getItem("username"); // Get username from localStorage
    console.log("Retrieved username from localStorage:", username);

    if (username) {
      axios
        .get(`http://localhost:4000/api/login/${username}`) // Fetch user data based on username
        .then((response) => {
          console.log("Fetched user data:", response.data);
          setUserData(response.data); // Store user data from API in state
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
        });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/recipes")
      .then((response) => {
        console.log("Fetched recipes:", response.data.recipes);
        setRecipes(response.data.recipes); // Store the recipes
        processChartData(response.data.recipes); // Process data for the chart
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes.");
      });
  }, []); 

  // Process data for the graph
  const processChartData = (recipes) => {
    console.log("Processing recipes for chart:", recipes);
    
    const categoryCounts = recipes.reduce((counts, recipe) => {
      recipe.categories.forEach((category) => {
        counts[category] = (counts[category] || 0) + 1;
      });
      return counts;
    }, {});

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts).map(
      (count) => (count / recipes.length) * 100
    ); // Calculate percentages

    setChartData({
      labels,
      datasets: [
        {
          label: "Recipe Categories (%)",
          data,
          backgroundColor: "rgba(255, 97, 65, 0.6)", // Soft coral color
          borderColor: "rgba(255, 97, 65, 0.6)", // Soft blue color
          borderWidth: 3, // Thicker border for a cuter look
          hoverBackgroundColor: "rgba(255, 90, 60, 0.8)", // Change hover color
          hoverBorderColor: "rgba(255, 90, 60, 0.8)", // Change hover border color
          borderRadius: 12, // Round corners for a softer feel
        },
      ],
    });
  };
  

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    logout();
    navigate("/login");
  };

  // If there is an error fetching data or no data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  if (userData) {
    return (
      <div className="dashboard">
        {/* Background Section */}
        <div className="dashboard-header">
          <div className="overlay">
            <h1 className="dashboard-title">DASHBOARD</h1>
            <p>Welcome back, {userData.username} ({userData.email})</p>
          </div>
        </div>
        <div className="create-card">
            <h1 className="create-title">Adds an element of fun, making the user feel like they’re sharing something magical.</h1>
           
            {/* "Create" Button with onClick event to navigate */}
            <button className="create-btn" onClick={handleCreateClick}>Share Your Recipe Magic!</button>
          </div>

        <div className="card-container-dashboard">

          <div className="chart">
            <h1 className="chart-title">The Recipe Breakdown</h1>
              {/* Display Chart */}
              {chartData && (
                <div style={{  width: "100%", height: "500px",  margin: "100px auto" }}>
                  <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
              )}
          </div>
          
          {/* Recipe Management Card */}
          <RecipeManagementCard recipes={recipes} reloadRecipes={() => setRecipes([])} />
        </div>

        {/* Log Out Button */}
        <button className="button-logout" onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return <div>Loading...</div>; // Show loading state until data is fetched
};

export default Dashboard;
