import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'


const NavigationLinks = () => {

    const { logout, currentUser } = useAuth()
    const [userType, setUserType] = useState("")
    //Using React Router NavLink component to link to different pages
    //Styling using bootstrap classes

    const activeLinkColor = '#ffdf00'

    async function getUserType(currentUser) {
        if (currentUser) {
            //reference our doc
            const trainerRef = await db.collection('trainers').doc(currentUser.uid).get();
            //open our doc and read, doesnt assign trainer a value until the promise is returned
            const trainer = await trainerRef.data();

            const clientRef = await db.collection('users').doc(currentUser.uid).get();
            const client = clientRef.data();

            if (currentUser && trainer) {
                setUserType("Trainer")
            }

            if (currentUser && client) {
                setUserType("Client")
            }
        }
        
    }
    
    getUserType(currentUser)

    return (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {currentUser && (userType === "Trainer")
                    ? <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/clients'>Client Workouts</NavLink>
                    : <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/workouts'>Workouts</NavLink>
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