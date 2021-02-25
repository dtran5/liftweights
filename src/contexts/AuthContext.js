import React, { useContext, useState, useEffect } from 'react';
//imports the auth module we just created in our firebase.js file
import { auth, db } from '../firebase'

//creates a context object with name AuthContext
//use this context inside of provider
const AuthContext = React.createContext()

//this function allows us to use this context
export function useAuth() {
    //This functions returns our useContext hook which takes in the Context object
    //we created that we want to make use of. //This returns us the value that we passed in
    //down at the provider - THE VALUE OBJECT!
    return useContext(AuthContext)
}

//children props comes from context
export function AuthProvider({ children }) {
    //our state for current user, by default we have no user
    const[currentUser, setCurrentUser] = useState()
    const [clientTypeState, setClientTypeState] = useState('')
    const [trainerTypeState, setTrainerTypeState] = useState('')
    const [clientTrainerEmailState, setClientTrainerEmailState] = useState('')
    //initially we are loading and as soon as we get that first useEffect thats runs, it means
    //firebase did the verification to see if there was a user
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState('')
    const [email, setEmail] = useState('')
    // const [trainerType, setTrainerType] = useState('')
    // const [clientType, setClientType] = useState('')

    //function uses our auth module (firebase) to signup a user
    //this method comes from firebase
    //returns a promise
    //whenever we call createUserWithEmailAndPassword it calls setCurrentUser and
    //sets the user for us within onAuthStateChanged
    //firebase creates the local storage for us as well as tokens - FIND THIS IN VIDEO
    //gotta make sure we return these functions because they are promises
    async function signup(name, email, password, select, clientTrainer) {
        const newUser = await auth.createUserWithEmailAndPassword(email, password)

        await newUser.user.updateProfile({
            displayName: name
        })

        //Gives every user (trainer or client) an email property in auth object
        await newUser.user.updateEmail(email)
        
        await setUid(newUser.user.uid)
        
        
        //creates user or trainer in db and sets the usertype to selected value in dropdown
        //adds clients trainer to their user information
        if (select === "Trainer") {
            return await db.collection("trainers").doc(newUser.user.email).set({
                userType: select,
            })
        } else {
            return await db.collection("users").doc(newUser.user.uid).set({
                userType: select,
                clientTrainer: clientTrainer
            })
        }
    }

    //Goes into firebase, gets the currently logged in user, grabs the userType value and returns it
    //Have to do this because firebase auth doesnt allow for custom claims 
    //We run both types because we are unsure of the type at first until it is grabbed and the trycatch block allows us to catch the error without crashing the app
    async function getTrainerType(currentUser) {
        if (currentUser) {
            try {
                const trainerRef = await db.collection('trainers').doc(currentUser.email).get();
                const trainerType = await trainerRef.data().userType
                return trainerType
            } catch (error) {
                console.error(error)
            }
        }
    }
    
    async function getClientType(currentUser) {
        if (currentUser) {
            try {
                const clientRef = await db.collection('users').doc(currentUser.uid).get()
                const clientType = await clientRef.data().userType
                
                return clientType
            } catch (error) {
                console.error(error)
            }
        }
    }
    //Refactor this - got weird error infinite loop when tried to add this action into getClientType function
    async function getClientTrainerEmail(currentUser) {
        if (currentUser) {
            try {
                const clientTrainerEmailRef = await db.collection('users').doc(currentUser.uid).get()
                const clientTrainerEmail = await clientTrainerEmailRef.data().clientTrainer
                
                return clientTrainerEmail
            } catch (error) {
                console.error(error)
            }
        }
    }

    //Get client type value from database by calling this function from authcontext, passing in currentuser, and setting componnent state
    getClientType(currentUser).then((clientType) => {
        setClientTypeState(clientType)
    })
    

    // Get trainer type value from database by calling this function from authcontext, passing in currentuser, and setting componnent state
    getTrainerType(currentUser).then((trainerType) => {
        setTrainerTypeState(trainerType)
    })

    getClientTrainerEmail(currentUser).then((clientTrainerEmail) => {
        setClientTrainerEmailState(clientTrainerEmail)
    })

    async function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)

    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        

        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail (email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword (password) {
        return currentUser.updatePassword(password)
    }


    useEffect(() => {
        //onAuthStateChanged is firebase recommended method for getting the
        //current user. We set an observer on the auth object
        //we want onAuthStateChanged to be inside a useEffect and not in our render
        //because we only want this to run when we mount our component (first time it loads)
        //Unsubscribe to avoid memory leaks - when we initialize auth.onAuthStateChanged we
        //create a listener to continue to listen even after we have stopped using it, wasting
        //memory. to prevent we unsubscribe from listener when we unmount app
        //auth.onAuthStateChanged when called, will return a method that when we call unsubscribe
        //it will unsubscribe the onauthostatechanged event
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            //Whenever auth state actually changes, it means we are done loading
            setLoading(false)
            
            
        })
        //this will unsubscribe us from the onauthstatechanged listener when we unmount the
        //component
        return unsubscribe
    }, [])
    
    //this object is passed to our provider, we want current user
    //also pass signup so we can use anywhere
    const value = {
        clientTrainerEmailState,
        clientTypeState,
        trainerTypeState,
        email,
        uid,
        currentUser,
        getClientType,
        getTrainerType,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    //children are the components between our <AuthProvider> Tags in the
    //App.js file!
    //the value returns all of the information that can be accessed from any of our children
    //components - in this case it is our authentication info
    //simple check to see if we are loading because if we are not loading then we render the
    //children otherwise we want to not render the children because we are loading
    //none of our application will render unless we have our user for the first time
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

