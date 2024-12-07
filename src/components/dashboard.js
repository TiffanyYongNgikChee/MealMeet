import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import UserInfoCard from "./UserInfoCard";
import RecipeManagementCard from "./RecipeManagementCard";

const Dashboard = () => {
  const { isLoggedIn,user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);

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

  // Log userData to check if it has been set
  useEffect(() => {
    console.log("User Data State:", userData);
  }, [userData]);

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