import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email, password };

        axios.post('http://localhost:4000/api/login', credentials)
            .then((res) => {
                console.log(res.data);  // Success response
                setSuccessMessage("Login successful!");
                localStorage.setItem('token', res.data.token); // Store token for authentication
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data.message : err.message);
            });
    };

    return (
        <div>
            <h3>Login</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
};

export default Login;
