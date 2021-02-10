import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

import NavigationLinks from './NavigationLinks'

const MainNavigation = () => {
    const { currentUser } = useAuth()
    
    

    return (
        <Navbar bg="secondary" expand="lg">
            { currentUser 
            ? <NavLink to='/' exact><Navbar.Brand>{currentUser.email}</Navbar.Brand></NavLink>
            : <NavLink to='/' exact><Navbar.Brand>Lift Weights</Navbar.Brand></NavLink>}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <NavigationLinks />
        </Navbar>
    )
}

export default MainNavigation