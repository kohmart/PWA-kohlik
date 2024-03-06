import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from "../Assets/logo.png";
import { Button } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/appApi';
function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(event) {
        event.preventDefault();
        await logoutUser(user);
        // redirect to home
        window.location.replace("/");
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand><img src={logo} style={{ width: 50, height: 50 }} />= </Navbar.Brand>

                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {/* <LinkContainer to="/chat">
                            <Nav.Link>Chat</Nav.Link>
                        </LinkContainer> */}
                        {user && (
                            <NavDropdown title={
                                <>
                                    {user.name}
                                </>
                            } id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <LinkContainer to="/chat">
                                        <Nav.Link>To Chat</Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button variant='danger' onClick={handleLogout}>
                                        logout
                                    </Button>
                                </NavDropdown.Item>

                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;