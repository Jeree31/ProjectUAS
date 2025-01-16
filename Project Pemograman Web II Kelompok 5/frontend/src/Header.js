import { Navbar, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import "./header.css";

function Header() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate(); // Initialize useNavigate

  function logOut() {
    localStorage.clear();
    navigate("/login"); // Redirect to login page
  }

  console.warn(user);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">e-Commerce</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {user ? (
              <>
                <Link className="navbar_link" to="/">
                  Product List
                </Link>
                <Link className="navbar_link" to="/add">
                  Add Product
                </Link>
                <Link className="navbar_link" to="/search">
                  Search Product
                </Link>
              </>
            ) : (
              <>
                <Link className="navbar_link" to="/login">
                  Login
                </Link>
                <Link className="navbar_link" to="/register">
                  Register
                </Link>
              </>
            )}
          </Nav>
          {user ? (
            <Nav>
              <NavDropdown title={user.name}>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
