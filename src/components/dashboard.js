import React from "react";

const Dashboard = () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to Your Dashboard</h1>
            <h2>Username: {username}</h2>
            <h2>Email: {email}</h2>
        </div>
    );
};

export default Dashboard;
