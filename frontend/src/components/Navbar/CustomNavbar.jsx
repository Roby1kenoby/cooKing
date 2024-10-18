import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './CustomNavbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import logo from '../../assets/single-logo.png';

function CustomNavbar() {
    const { loggedUser } = useContext(LoginContext)
    const nav = useNavigate()
    const handleLogout = function () {
        localStorage.clear()
        nav('/login')
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand as={Link} to={`/profile/${loggedUser?._id}`}>
                    <img src={logo} />
                </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`/profile/${loggedUser?._id}`}>Home</NavDropdown.Item>
                            <NavDropdown.Item as={Link} onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;