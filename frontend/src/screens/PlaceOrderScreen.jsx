import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
//import { saveShippingAddress } from '../actions/cartActions.jsx'
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { createOrder } from "../actions/orderActions.jsx";
import { ORDER_CREATE_RESET } from "../constants/orderConstants.jsx";
import FormContainer from "../components/FormContainer.jsx";

export const PlaceOrderScreen = () => {
  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = (cart.itemsPrice * 0.18).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const navigateMethod = () => {
    navigate(`/order/${order._id}`);
  };

  useEffect(() => {
    if (success) {
      navigateMethod();
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigateMethod]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <FormContainer>

      <CheckoutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address},{"  "}
                {cart.shippingAddress.city},{"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <h3>your cart is empty</h3>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} >
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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && <strong>{error}</strong>}
              

              <ListGroup.Item className="d-flex justify-content-center">
                <Button
                  type="button"
                  
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
