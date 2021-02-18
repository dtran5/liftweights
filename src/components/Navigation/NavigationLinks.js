import React, { useState } from 'react';
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

    function getUserType() {
        //checks to make sure user is logged in, if not wont run
        //important because otherwise it cant read uid of undefined
        if (currentUser) {
            let docRef = db.collection('users').doc(currentUser.uid)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    setUserType(doc.data().userType)
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }
    getUserType()
       
    

    return (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {currentUser && (userType === "Trainer")
                    ? <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/clients'>Client Workouts</NavLink>
                    : <NavLink activeStyle={{ color: activeLinkColor }} className="nav-link" to='/workouts'>Workouts</NavLink>}
                    
                    
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