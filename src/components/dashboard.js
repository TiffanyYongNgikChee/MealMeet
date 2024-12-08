import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Import Chart.js component
import Chart from "chart.js/auto"; // Necessary for Chart.js
import UserInfoCard from "./UserInfoCard";
import RecipeManagementCard from "./RecipeManagementCard";

const Dashboard = () => {
  const { isLoggedIn,user, logout } = useContext(AuthContext);
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

    // Fetch user data based on token
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data from the backend
    const username = localStorage.getItem("username"); // Get username from localStorage
    console.log("Retrieved username from localStorage:", username);

    if (username) {
      axios
        .get(`http://localhost:4000/api/login/${username}`) // Fetch user data based on username
        .then((response) => {
          console.log("Fetched user data:", response.data); // Log the fetched data
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
  }, []); // Empty dependency array means it runs once when the component mounts.
  

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
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });
  };

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    localStorage.removeItem("username");  // Remove username from localStorage
    localStorage.removeItem("email");  // Remove email from localStorage
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to the login page
  };

  // If there is an error fetching data or no data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If user data is loaded, show the dashboard
  if (userData) {
    return (
      <div className="dashboard">
        <div className="card-container-dashboard">
          {/* User Info Card */}
          {userData && <UserInfoCard userData={userData} />}
  
          {/* "Create" Button with onClick event to navigate */}
          <button className="create-btn" onClick={handleCreateClick}>Create</button>
          
          {/* Display Chart */}
          {chartData && (
            <div style={{ width: "600px", margin: "20px auto" }}>
              <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          )}

          {/* Recipe Management Card */}
          <RecipeManagementCard recipes={recipes} reloadRecipes={() => setRecipes([])} />
        </div>
        
        {/* Log Out Button */}
        <button className="button-dashboard" onClick={handleLogout}>Log Out</button>

      </div>
    );
  }

  return <div>Loading...</div>; // Show loading state until data is fetched
};

export default Dashboard;