import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const UserUrl = process.env.REACT_APP_API_KEY_USER;
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = { email, password, confirmPassword, name: username };
      const response = await axios.post(`${UserUrl}signup`, newUser);
      console.log(response);
      const loginRes = await axios.post(`${UserUrl}login`, {
        email,
        password,
      });
      //   setUserData({
      //     token: loginRes.data.token,
      //     user: loginRes.data.user,
      //   });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user-data", loginRes.data.user);
      localStorage.setItem("isLoggedIn", true);
      setLoading(false);
      dispatch(authActions.login());
      navigate("/");
    } catch (err) {
      setLoading(false);
      err.response.data.message && setError(err.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    console.log("Its Signup");
  }

  return (
    <div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Already have an account?<Link to="/login">Log in</Link>
            </div>
          </>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
