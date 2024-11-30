import Food from "./components/food";
import Details from "./components/details";
import Create from "./components/create";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/food" element={<Food />} />
        <Route path="/details" element={<Details/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </Router>
  );
}

export default App;
