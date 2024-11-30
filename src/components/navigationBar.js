import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">MealMeet</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/food">Home</Nav.Link>
              <Nav.Link href="/details">Details</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;