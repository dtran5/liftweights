import React, { useEffect, useRef, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import RenderTrainerClients from "./RenderTrainerClients";

function GetClientList() {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const {
    currentUser: { uid },
  } = useAuth();
  const [clientList, setClientList] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await db
      .collection("trainers")
      .doc(uid)
      .collection("trainer-clients")
      .doc(emailRef.current.value)
      .set({
        name: nameRef.current.value,
        email: emailRef.current.value,
      })
      .then(() => {
        console.log("Added new client");
      })
      .catch(() => {
        console.log("Client failed to add");
      });
  }

  useEffect(() => {
    function getClients() {
      db.collection("trainers")
        .doc(uid)
        .collection("trainer-clients")
        .onSnapshot(handleSnapshot);
    }

    getClients();
  }, [clientList, uid]);

  function handleSnapshot(snapshot) {
    const clientList = snapshot.docs.map((client) => {
      return { id: client.id, ...client.data() };
    });

    setClientList(clientList);
  }

  return (
    <>
      <div></div>
      <Container
        className="d-flex justify-content-center align-items-center mt-3"
        style={{ minHeight: "75vh" }}
      >
        <Row className="text-center">
          <Col className="d-flex flex-column align-items-center" xs={12} sm={6}>
            <h3 className="clientlist__form-header">New client?</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label className="clientlist__form--input">
                  Name
                </Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label className="clientlist__form--input">
                  Email
                </Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button type="submit">Add to list</Button>
            </Form>
          </Col>
          <Col
            className="d-flex flex-column align-items-center mt-3"
            xs={12}
            sm={6}
          >
            {clientList.map((client) => (
              <RenderTrainerClients key={client.id} client={client} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GetClientList;
