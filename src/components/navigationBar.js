import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar style={{ backgroundColor: 'orange' , borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }} variant="dark">
      <Container> <Navbar.Brand href="/"> 
       <img src="https://twistedfood.s3.us-west-1.amazonaws.com/images/pot.svg" width="40" height="40" className="d-inline-block align-top" alt="Logo" /> MealMeet </Navbar.Brand> 
       <Nav className="me-auto"> 
        <Nav.Link href="/food">Recipe</Nav.Link>
         <Nav.Link href="/details">Lifestyle</Nav.Link>
          <Nav.Link href="/create">Trending</Nav.Link> 
      </Nav>
      <Nav>
          <Nav.Link href="/login" className="user-icon">
            <img 
              src="https://www.svgrepo.com/show/381806/user.svg" 
              alt="Login or Register" 
              className="user-icon-img" 
            />
          </Nav.Link>
        </Nav>
      </Container> 
    </Navbar>
  );
};

export default NavigationBar;