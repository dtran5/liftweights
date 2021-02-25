import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'

const NavigationLinks = () => {
    const { logout, currentUser, clientTypeState, trainerTypeState } = useAuth()
    //Using React Router NavLink component to link to different pages
    //Styling using bootstrap classes
    const activeLinkColor = '#ffdf00'
    return (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {currentUser && (trainerTypeState)
                    ? <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/clients'>Client Workouts</NavLink>
                    : (currentUser && clientTypeState)
                    ? <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to={`/${currentUser.email}`}>Workouts</NavLink>
                    : (!currentUser)
                    ? <NavLink activeStyle={{ color: activeLinkColor }} exact className="nav-link" to={`/clients`}>Workouts</NavLink>
                    : ""
                    }
                    
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