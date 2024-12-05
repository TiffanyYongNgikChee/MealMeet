import Food from "./components/food";
import Details from "./components/details";
import Create from "./components/create";
import Edit from "./components/edit";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/create" element={<Create/>} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
