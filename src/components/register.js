import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    // State hooks for managing form inputs and messages
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a user object to send in the request bod
        const user = { username, email, password };
        
        // Make a POST request to the backend API to register the user
        axios.post('http://localhost:4000/api/register', user)
            .then((res) => {
                // Handle successful registration
                console.log(res.data);
                setSuccessMessage("User registered successfully!");
                setError('');
            })
            .catch((err) => {
                // Handle errors that occur during registration
                setError(err.response ? err.response.data.message : err.message);
                setSuccessMessage('');
            });
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h3>Register</h3>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                {/* Registration form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* Username input field */}
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {/* Email input field */}
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password input field */}
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Submit button to trigger the form submission */}
                    <button type="submit" className="register-btn">Register</button>
                </form>
                {/* Link to the login page for users who already have an account */}
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
