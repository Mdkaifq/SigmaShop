import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions.jsx";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <FormContainer>
      {loading && <Loader />}
      {error && (
        
          <Message className='my-3' variant="danger" children={error} />
          
        
      )}
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="my-1">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <center >
        <Button type="submit" variant="primary" className="my-2">
          sign in
        </Button>
        </center>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Click here to Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
