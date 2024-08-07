import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../actions/orderActions";
import { payOrder } from "../actions/orderActions.jsx";
import { ORDER_PAY_REQUEST } from "../constants/orderConstants.jsx";

const stripePromise = loadStripe(
  "pk_test_51PjefZRrIw1m0GxpOaNicWAttONEzZoPah1anBgr0E2GGWSvSdAP2Zb4huPoaFWpVRgdW5XyFkFwQhieHYIVMwyR00gVh1qWkn"
);

const CheckoutForm = ({ pk }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  

  const paymentIntent = useSelector((state) => state.paymentIntent);
  const { clientSecret, loading, error } = paymentIntent;

  const orderPay = useSelector((state) => state.orderPay);
  const{ loading: payLoading, success: isPaid } = orderPay

  useEffect(() => {
    if (!isPaid && !payLoading) {
      dispatch(createPaymentIntent(pk));
    }
  }, [dispatch, isPaid, payLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({type: ORDER_PAY_REQUEST})
    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

    if (methodError) {
      console.error(methodError);
      return;
    }

    if (!clientSecret) {
      console.error("Missing client_secret");
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error(confirmError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      dispatch(payOrder(pk));
      
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <>
      {payLoading && <div class="colorful"></div>}

      {!payLoading &&
        <form onSubmit={handleSubmit}>
        <div className="card-input">
          <div className="input-row">
            <div className="input-field">
              <label>Card Number</label>
              <CardNumberElement options={cardElementOptions} />
            </div>
            <div className="input-field">
              <label>Expiry Date</label>
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <label>CVV</label>
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>
        <center>
          <button
            type="submit"
            className="pay-button"
            style={{ margin: "5px 6px 7px 8px" }}
            disabled={!stripe || loading}
          >
            Pay
          </button>
        </center>
        {error && <div>{error}</div>}
      </form>
  }
    </>
  );
};

const WrappedCheckoutForm = ({ id }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm pk={id} />
  </Elements>
);

export default WrappedCheckoutForm;
