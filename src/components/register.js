import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, email, password };

        axios.post('http://localhost:4000/api/register', user)
            .then((res) => {
                console.log(res.data);
                setSuccessMessage("User registered successfully!");
                setError('');
            })
            .catch((err) => {
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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
