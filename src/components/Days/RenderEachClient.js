import React from 'react';
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Container, ListGroup, Button} from 'react-bootstrap'


const RenderEachClient = ( { client: {name, email, id} }) => {

    const { currentUser: { uid } } = useAuth()

    
    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
        
    }

    const capitalName = capitalizeFirstLetter(name)

    function handleDelete() {
        const clientRef = 
          db.collection("trainers")
            .doc(uid)
            .collection("trainer-clients")
            .doc(id)
            
            clientRef
            .delete()
            .then(()=>{
                console.log('deleted');
            }).catch(error => {
                console.error("Error deleting", error)
            })
        
    }
    
    return (
        <Container>
            <ListGroup horizontal >
                <ListGroup.Item style={{ width: '300px' }}><Link to={`/client/${email}`}>{capitalName}</Link></ListGroup.Item>
                <ListGroup.Item><Button onClick={handleDelete} type="button">Delete</Button></ListGroup.Item>
            </ListGroup>
        </Container>
        
    )
}

export default RenderEachClient