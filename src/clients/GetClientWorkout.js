import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Container, Table } from "react-bootstrap";
import RenderClientWorkout from "./RenderClientWorkout";

function GetClientWorkout() {
  const emailOfClient = useParams().email;
  const date = useParams().date;
  const [exerciseList, setExerciseList] = useState([]);
  const { clientTrainerEmailState } = useAuth();

  useEffect(() => {
    async function getClientWorkouts() {
      await db
        .collection("trainers")
        .doc(clientTrainerEmailState)
        .collection("trainer-clients")
        .doc(emailOfClient)
        .collection("dates")
        .doc(date)
        .collection("exercise-details")
        .onSnapshot(handleSnapshot);
    }

    getClientWorkouts();
  }, [date, emailOfClient, clientTrainerEmailState]);

  function handleSnapshot(snapshot) {
    const exerciseList = snapshot.docs.map((exercise) => {
      return { id: exercise.id, ...exercise.data() };
    });

    setExerciseList(exerciseList);
  }

  return (
    <>
      <Link to={`/training/${emailOfClient}`}>Back</Link>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Table striped bordered hover className="w-75 table-borderless">
          <thead className="clientworkout__table-head">
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Suggested Starting Weight</th>
            </tr>
          </thead>
          <tbody className="clientworkout__table-body">
            {exerciseList.map((exercise) => (
              <RenderClientWorkout key={exercise.id} exercise={exercise} />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default GetClientWorkout;
