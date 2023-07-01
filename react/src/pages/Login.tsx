import {Link, useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import React, {useState} from "react";
import axiosClient from "../../axios-client.ts";
import {useStateContext} from "../context/ContextProvider.tsx";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      email: email,
      password: password
    };
    try {
      const { data } = await axiosClient.post("/login", payload);
      setUser(data.user);
      setToken(data.token);
      navigate("/posts");
    } catch (err: any) {
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
        style={{ width: '80%', maxWidth: 500, margin: '0 auto' }}
        onSubmit={handleLogin}
      >
        <h2 className="text-center">Log In</h2>
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
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </Button>
        <div className="py-4">
          <p className="text-center">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
