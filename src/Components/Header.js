import React, { Component } from "react"
import { Navbar, Nav, Container, Form, NavLink, Button } from "react-bootstrap";
import logo from '../images/Logo.png'
import axios from "axios";
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'

//import fon from '../images/fon.png'

class Header extends Component {

    constructor(props) {
        super(props);
        this.menu = React.createRef();
        this.isMenuOpen = false;
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        axios.post(`http://localhost:3001/api/auth/logout`, this.state)
            .then(res => {
                axios.defaults.headers['authorization'] = localStorage.removeItem('token');
                this.props.onUserLoggedOut()

            })
            .finally(() => {
                window.alert('User logged out')
                window.location.href = 'http://localhost:3000/posts'
            })
    }
    showSettings (event) {
        event.preventDefault();
    }

    toggleMenu = event => {
        this.menu.current.style.display = this.isMenuOpen ? "none" : "initial"
        // this.isMenuOpen = !!this.isMenuOpen
    }

    render() {
        let loginLogoutButton, regButton, profileButton;
        if (this.props.currentUser) {
            loginLogoutButton = <NavLink onClick={this.handleSubmit} className="btn"><h4>Log out</h4></NavLink>
            regButton = null
            profileButton = <a href="/profile">Profile </a>
        } else {
            loginLogoutButton = <NavLink href="/login"><h4>Log in</h4></NavLink>
            regButton = <NavLink href="/register"><h4>Sing up</h4></NavLink>
            profileButton = null
        }
        return (
            <>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="white">
                    <Container>
                        <Navbar.Brand href="/posts">
                            <img
                                src={logo}
                                className="inline"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="pages">
                                <NavLink href="/categories"><h4>Categories</h4></NavLink>
                            </Nav>
                            <Form inline>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-3"

                                />
                                <Nav>
                                    <main>
                                        <div className="menu-block">
                                            <nav className="menu-nav">
                                                <a href="/post/create">New post </a>
                                                <a href="/settings">Settings </a>
                                                <a href="/security">Security </a>
                                                {profileButton}
                                            </nav>

                                        </div>
                                        {/*<div className="menu-block">*/}
                                        {/*    <div className="menu-button" onClick={this.toggleMenu}>menu</div>*/}
                                        {/*    <nav ref={this.menu} className="menu-nav">*/}
                                        {/*        <div className="item">*/}
                                        {/*            <a href="/post/create">New post </a>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="item">*/}
                                        {/*            <a href="/settings">Settings </a>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="item">*/}
                                        {/*            <a href="/security">Security </a>*/}
                                        {/*        </div>*/}
                                        {/*        {profileButton}*/}
                                        {/*    </nav>*/}

                                        {/*</div>*/}
                                        {/*<App />*/}
                                    </main>
                                    {regButton}
                                    {loginLogoutButton}
                                </Nav>
                            </Form>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>


        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLoggedOut: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)