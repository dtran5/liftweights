import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'



const NavigationLinks = () => {

    const { logout, currentUser } = useAuth()
    console.log(currentUser);
    //Using React Router NavLink component to link to different pages
    //Styling using bootstrap classes

    const activeLinkColor = '#ffdf00'

    return (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/record'>Record</NavLink>
                    <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/dailyworkouts'>Days</NavLink>
                    { 
                        currentUser 
                        ?   <NavLink 
                                activeStyle={{ color: activeLinkColor }} 
                                className="nav-link" to='/login'
                                onClick={() => logout()}
                            >
                                Logout
                            </NavLink> 
                        :   <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/login'>Login</NavLink>
                    }
                </Nav>
        </Navbar.Collapse>
    )
}

export default NavigationLinks