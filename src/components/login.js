import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email, password };

        axios.post('http://localhost:4000/api/login', credentials)
            .then((res) => {
                console.log(res.data);
                const { token, username, email } = res.data;

                // Store token and user details in localStorage or state
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                console.log("Saved username in localStorage:", localStorage.getItem("username"));
                
                // Update AuthContext state
                login({ username, email });

                // Navigate to dashboard
                navigate("/dashboard");
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h3>Login</h3>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="register-link">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
