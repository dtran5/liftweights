import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
//this is our way to use our context that we created in AuthContext
import { useAuth } from "../../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef();

  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //this is an async function - had to check passwords and get back to us
  async function handleSubmit(e) {
    e.preventDefault();

    //if its successful it will - set error to empty and set a loading state which will
    //disable the submit button so users dont keep clicking and signing up
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox to reset password");
    } catch {
      setError("Failed to reset password");
    }
    //after everything is done, setloading back to false - this is done after it is done
    //awaiting the signup function
    setLoading(false);
  }

  //if we are currently loading, dont want to be able to resubmit form!
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ForgotPassword;
