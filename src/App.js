import Food from "./components/food";
import Details from "./components/details";
import Create from "./components/create";
import Edit from "./components/edit";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './Login.css'
import "./Register.css";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider correctly

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/create" element={<Create/>} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
