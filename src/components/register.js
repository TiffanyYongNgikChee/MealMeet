import axios from "axios";
import { useState } from "react";

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username,email,password};
        console.log(user);

        axios.post('http://localhost:4000/api/register',user)
        .then((res) => {
            console.log(res.data);  // Success response from backend
        })
        .catch((err) => {
            console.error("Error:", err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : err.message);  // Display the error message
        });
    }

    return (
        <div>
            <h3>Register User</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}  {/* Show success message */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
};
export default Register;