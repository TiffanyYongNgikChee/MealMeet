import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { isLoggedIn,user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  // If there is an error fetching data or no data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If user data is loaded, show the dashboard
  if (userData) {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
    );
  }

  return <div>Loading...</div>; // Show loading state until data is fetched
};

export default Dashboard;