import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../actions/userActions.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_PROFILE_RESET } from "../constants/userConstants.jsx";
import { listMyOrders } from "../actions/orderActions.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setmessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {loading && <Loader />}
        {error && <Message variant="danger" children={error} />}
        {message && <h3>{message}</h3>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="my-1">Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="my-1">Email</Form.Label>
            <Form.Control
              required
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

          <Form.Group controlId="passwordConfirm">
            <Form.Label className="my-1">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <center>
            <Button type="submit" variant="primary" className="my-2">
              update
            </Button>
          </center>
        </Form>
      </Col>
      <Col md={9}>
        <center>
          <h2>My Orders</h2>
        </center>
        {loadingOrders ? (
          <Loader/>
        ) : errorOrders ? (
          <Message variant='danger' children={errorOrders}/>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : " No"}
                  </td>
                  <td>{order.isDelivered ? " Yes" : " No"}</td>
                  <td>
                    <Button
                      className="py-2"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
