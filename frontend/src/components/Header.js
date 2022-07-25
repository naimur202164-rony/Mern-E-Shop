import React from 'react'
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import  SearchBox  from './SearchBox'

const Header = () => {

    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin 

    const logoutHandler = (e) =>{
        dispatch(logout())

    }
    return (
        <header>
            <Navbar 
                    bg="dark" 
                    variant="dark"
                    expand="lg"
                    collapseOnSelect>
                        <img
                            src="/img/nav_logo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top "
                            alt="nav-logo"
                        />
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Pro Shop</Navbar.Brand>
                    </LinkContainer>    
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            {/* <Route render={({ history}) => <SearchBox  history={history}/>} /> */}
                            <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                            <Nav.Link> 
                                <i className="fas fa-shopping-cart"></i> Cart 
                            </Nav.Link>
                    </LinkContainer>
                    { userInfo ? 
                    (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item >
                                <i className="fas fa-user-cog"></i> Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item
                                onClick={logoutHandler}
                            >
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        
                    )
                    :(
                        
                        <LinkContainer to='/login'>
                        <Nav.Link>
                            <i className="fas fa-user"></i> Sign In 
                        </Nav.Link>
                        </LinkContainer>
                    )}                    
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item >
                                    <i className="fas fa-user-cog"> Users </i> 
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item >
                                    <i className="fas fa-box-open" > Products </i> 
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item >
                                    <i className="fas fa-cart-arrow-down"> Orders </i> 
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>      
            </Navbar>
        </header>
    )
}

export default Header

