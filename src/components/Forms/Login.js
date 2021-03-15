import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
//this is our way to use our context that we created in AuthContext
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //this is an async function - had to check passwords and get back to us
  async function handleSubmit(e) {
    e.preventDefault();

    //if its successful it will - set error to empty and set a loading state which will
    //disable the submit button so users dont keep clicking and signing up
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in to your account");
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
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
