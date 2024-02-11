import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState({});
  const UserUrl = process.env.REACT_APP_API_KEY_USER;
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(`${UserUrl}login`, loginUser);
      //   //   setUserData({
      //   //     token: loginRes.data.token,
      //   //     user: loginRes.data.user,
      //   //   });
      console.log(loginRes.data);
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user-data", loginRes.data.user);
      localStorage.setItem("isLoggedIn", true);
      dispatch(authActions.login());
      navigate("/");
    } catch (err) {
      setLoading(false);
      err.response.data.message && setError(err.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    console.log("Its Login");
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
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
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
                  {}
                  <Button
                    disabled={loading}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    {loading ? "Waiting..." : "Log in"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Need an account?<Link to="/signup">Sign up</Link>
            </div>
          </>
        </div>
      </Container>
    </div>
  );
};

export default Login;
