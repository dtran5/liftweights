import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'



const NavigationLinks = () => {
    //Using React Router NavLink component to link to different pages
    //Styling using bootstrap classes

    const activeLinkColor = '#ffdf00'

    return (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/record'>Record</NavLink>
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/day'>Day</NavLink>
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/week'>Week</NavLink>
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/month'>Month</NavLink>
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/past'>Past</NavLink>
                <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/login'>Login</NavLink>
                </Nav>
        </Navbar.Collapse>
    )
}

export default NavigationLinks