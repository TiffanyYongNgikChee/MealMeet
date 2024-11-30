import food from "./components/food";
import Details from "./components/details";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<food />} />
        <Route path="/food" element={<h1>Read Component</h1>} />
        <Route path="/details" element={<h1>Create Component</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
