import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = Cookies.getItem("jwtToken");
    const adminToken = localStorage.getItem("adminJwtToken");

    useEffect(() => {
        if (adminToken) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [adminToken]);

    const navigate = useNavigate();

    const onLogout = () => {
        Cookies.removeItem('adminJwtToken');
        const res = window.confirm("Are you sure you want to log out?");
        if (res) {
            localStorage.clear();
            Cookies.removeItem('jwtToken');
            navigate('/login');
        }
    };



    return (
        <div>
            {isAdmin ?
                <Navbar fixed="top" style={{ padding: '0 20px', minHeight: '10vh', width: '100%' }} expand="lg" bg="light" variant="light">
                    <Navbar.Brand><Link to='/admin/dashboard' style={{ textDecoration: 'none' }}>G-Mart</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="mr-auto">
                            <NavLink to="/admin/dashboard" className="nav-link">Home</NavLink>
                            <NavLink to="/admin/all-products" className="nav-link">Products</NavLink>
                            <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
                            <NavLink to="/admin/users" className="nav-link">Users</NavLink>

                            {!adminToken ? (
                                <NavLink as={NavLink} to="/login" className="nav-link">
                                    Login/SignUp
                                </NavLink>
                            ) : (
                                <NavLink className="nav-link" to="/login" onClick={onLogout}>
                                    Logout
                                </NavLink>
                            )}
                            <NavDropdown title="Dropdown" id="navbarDropdown">
                                <NavDropdown.Item href="#">Action</NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> :
                <Navbar fixed="top" style={{ padding: '0 20px', minHeight: '10vh', width: '100%' }} expand="lg" bg="light" variant="light">
                    <Navbar.Brand><Link to='/' style={{ textDecoration: 'none' }}>G-Mart</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="mr-auto">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/my-cart" className="nav-link">MyCart</NavLink>
                            <NavLink to="/my-orders" className="nav-link">Orders</NavLink>
                            <NavLink to="/my-history" className="nav-link">History</NavLink>

                            {!token ? (
                                <NavLink as={NavLink} to="/login" className="nav-link">
                                    Login/SignUp
                                </NavLink>
                            ) : (
                                <NavLink className="nav-link" to="/login" onClick={onLogout}>
                                    Logout
                                </NavLink>
                            )}
                            <NavDropdown title="Dropdown" id="navbarDropdown">
                                <NavDropdown.Item href="#">Action</NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>}
        </div>
    );
};

export default Header;
