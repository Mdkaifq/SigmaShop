import { Card } from "react-bootstrap";
import React from "react";
import Ratings from "./Ratings.jsx";
import { Link, Outlet } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Outlet />
      <Card.Body>
        <Card.Title as="h5"> {product.name}</Card.Title>

        <Ratings
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color={"#f8e825"}
        />

        <Card.Text as="h3"> ₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
