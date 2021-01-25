import React from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import NavigationLinks from './NavigationLinks'

const MainNavigation = () => {
    return (
        <Navbar bg="secondary" expand="lg">
            <NavLink to='/' exact><Navbar.Brand>Lift Weights</Navbar.Brand></NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <NavigationLinks />
        </Navbar>
    )
}

export default MainNavigation