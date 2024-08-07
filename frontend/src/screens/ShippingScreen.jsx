import { Form, Button } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions.jsx";
import { useState } from "react";
import FormContainer from "../components/FormContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps.jsx";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label className="my-1">address</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="enter your Name"
            value={address ? address : " "}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className="my-1">city</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="enter your city"
            value={city ? city : " "}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode ">
          <Form.Label className="my-1">Postal Code </Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="enter your postal code"
            value={postalCode ? postalCode : " "}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label className="my-1">Country</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="enter your country"
            value={country ? country : " "}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <center>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </center>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
