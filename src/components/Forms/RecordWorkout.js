import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import RenderTrainerClientWorkout from "../../trainers/RenderTrainerClientWorkout";

const RecordWorkout = () => {
  const emailOfClient = useParams().email;
  // const [clientTrainerEmail, setClientTrainerEmail] = useState('')
  const [exerciseList, setExerciseList] = useState([]);
  //grab the date from URL and use it as document name in database
  const date = useParams().date;
  //grab unique id created from database authentication
  const {
    currentUser: { uid, email },
    trainerTypeState,
  } = useAuth();
  const nameRef = useRef();
  const setsRef = useRef();
  const repsRef = useRef();
  const weightRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    //MAKE THIS EMAIL OF THE CLIENT
    //REWORK THIS DB TO FIT YOUR STRUCTURE
    //REMOVE CLIENT ABILITY TO CREATE WORKOUT
    //SET AN EMAIL VERIFICATION FOR CLIENT (IF CLIENT.EMAIL MATCHES EMAIL OF THE DOCUMENT, ALLOW VIEWING OF DOCUMENT)
    //Sets trainer's currently worked on client's email to each date so it can be verified later
    await db
      .collection("trainers")
      .doc(email)
      .collection("trainer-clients")
      .doc(emailOfClient)
      .collection("dates")
      .doc(date)
      .collection("exercise-details")
      .doc()
      .set({
        name: nameRef.current.value,
        sets: setsRef.current.value,
        reps: repsRef.current.value,
        weight: weightRef.current.value,
        //email is passed as a verification check when client tries to grab data
        email: emailOfClient,
      })
      .then(() => {
        console.log("worked");
      })
      .catch(() => {
        console.log("did not work");
      });
  }

  useEffect(() => {
    function getExerciseDetails() {
      db.collection("trainers")
        .doc(email)
        .collection("trainer-clients")
        .doc(emailOfClient)
        .collection("dates")
        .doc(date)
        .collection("exercise-details")
        .onSnapshot(handleTrainerSnapshot);
    }

    getExerciseDetails();
  }, [date, uid, emailOfClient, email]);

  //onSnapshot is an active listener that listens for changes to the collection so when user adds new exercise, it is immediately fetched and displayed
  //onSnapshot returns a callback for us to work on given documents

  //within the callback that onSnapshot provides, we are passed a snapshot of our data. It contains the documents in the collection. map through our docs array to return our data
  //exercise.id grabs the id of the document of the individual exercise and then exercise.data() opens the document and retrieves its contents
  function handleTrainerSnapshot(snapshot) {
    const exerciseList = snapshot.docs.map((exercise) => {
      return { id: exercise.id, ...exercise.data() };
    });
    setExerciseList(exerciseList);
  }

  return (
    <>
      <Link to={`/client/${emailOfClient}`}>Back</Link>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={12} md={6}>
            <Form onSubmit={handleSubmit} className="container mt-5 mr-5">
              <Form.Group controlId="exercise">
                <Form.Label>Exercise</Form.Label>
                <Form.Control
                  ref={nameRef}
                  type="text"
                  placeholder="Exercise Name"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="sets">
                <Form.Label>Sets</Form.Label>
                <Form.Control
                  ref={setsRef}
                  type="text"
                  placeholder="How many sets?"
                />
              </Form.Group>
              <Form.Group controlId="reps">
                <Form.Label>Reps</Form.Label>
                <Form.Control
                  ref={repsRef}
                  type="text"
                  placeholder="How many reps per set?"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  ref={weightRef}
                  type="text"
                  placeholder="Suggested starting weight"
                />
                <Form.Text className="text-muted"></Form.Text>
                <Button
                  className="allbuttons"
                  variant="primary"
                  type="submit"
                  size="sm"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={12} md={6}>
            <Table
              striped
              bordered
              hover
              className="recordworkout__table table-borderless"
            >
              <thead className="recordworkout__table-head">
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="recordworkout__table-body">
                {exerciseList.map((exercise) => (
                  <RenderTrainerClientWorkout
                    key={exercise.id}
                    exercise={exercise}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecordWorkout;
