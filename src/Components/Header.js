import React, {Component} from "react"
import {Navbar, Nav, Container, Form, Button} from "react-bootstrap";
import logo from '../images/Logo.png'
import {  Link} from "react-router-dom"
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Categories from "../Pages/Categories";



export default class Header extends Component {
    render() {
        return (
            <>
            <Navbar fixed="top" collapseOnSelect  expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="50"
                            width="150"
                            className="inline align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle  />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="pages" >
                            <Nav.Link href="/categories"> Categories </Nav.Link>

                        </Nav>
                        <Form inline >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="mr-sm-3 "
                            />
                            {/*<Button variant="outline-info"> Search</Button>*/}
                            <Nav>
                            <Nav.Link href="/login"> Log in </Nav.Link>
                            <Nav.Link href="/register"> Sing up </Nav.Link>
                            <Nav.Link href="/logout"> Log out </Nav.Link>
                            </Nav>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            </>




        )
    }
}
