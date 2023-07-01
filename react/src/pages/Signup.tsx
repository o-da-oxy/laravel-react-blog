import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client.ts";
import {useStateContext} from "../context/ContextProvider.tsx";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    try {
      const {data} = await axiosClient.post("/signup", payload);
      setUser(data.user);
      setToken(data.token);
      navigate("/posts");
    } catch (err: any) {
      console.log(err);
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        console.log(errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Form
        style={{width: "80%", maxWidth: 500, margin: "0 auto"}}
        onSubmit={handleSignup}
      >
        <h2 className="text-center">Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPasswordConfirmation"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
            value={passwordConfirmation}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
        <div className="py-3">
          <p className="text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
