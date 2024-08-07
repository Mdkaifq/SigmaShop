import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
//import { saveShippingAddress } from '../actions/cartActions.jsx'
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, deliverOrder } from "../actions/orderActions.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import WrappedCheckoutForm from "../components/CheckoutForm.jsx";




export const OrderScreen = () => {
  const [payNow, setPayNow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPaid = useSelector((state)=> state.orderPay);
  const { success: paySuccess } = orderPaid


  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || order._id !== Number(id) || successDeliver || paySuccess) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
      dispatch({ type: ORDER_PAY_RESET });
    }
  }, [order, id, dispatch, successDeliver, payNow, paySuccess]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };





  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <div>
      <h1>Order: {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>

              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},{"  "}
                {order.shippingAddress.city},{"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message
                  variant="success"
                  children={`Delivered On: ${order.deliveredAt.substring(
                    0,
                    10
                  )}`}
                />
              ) : (
                <Message variant="warning" children={" Delivery Pending"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message
                  variant="success"
                  children={`Paid On: ${order.paidAt.substring(0, 10)}`}
                />
              ) : (
                <Message variant="warning" children={"Not Paid"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <h3>You haven't made any orders</h3>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        {" "}
                        <Col md={1}>
                          <Image
                            src={item.image}
                            fluid
                            rounded
                            alt={item.name}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card   >
            <ListGroup variant="flush"  >
             

              <ListGroup.Item>
                <Row  >
                  <Col>Item:</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col >Total:</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            
            </ListGroup>

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className="d-flex justify-content-center" >
                  <Button
                    type="button"
                    className="my-2"
                    onClick={deliverHandler}
                    >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}

            {userInfo && !order.isPaid && !payNow &&(
              <ListGroup.Item className="d-flex justify-content-center">
                <Button
                  type="button"
                  className="my-2"
                  onClick={() => {
                    setPayNow(true);
                  }}
                >
                  Pay Now
                </Button>
              </ListGroup.Item>
            )}

            {userInfo && !order.isPaid && payNow && (
              <ListGroup.Item>
               <WrappedCheckoutForm id={id}  />
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
