import { Table, Button, Row, Col } from "react-bootstrap";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions.jsx";
import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";

function ProductListScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  let keyword = useLocation()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {

    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate("/");
    } if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else {
      dispatch(listProducts(keyword.search));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, keyword]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct())
  };

  return (
    <div>
      <center>
        <Row>
          <Col>
            <h1 className="mt-3">Products</h1>
          </Col>

          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
      </center>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger" children={errorDelete} />}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger" children={errorCreate} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>Category</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                <LinkContainer to={" "} >
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(product._id)}
                    className="btn-sm"
                    >
                    <i className="fas fa-trash"></i>
                  </Button>
                    </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={page} pages={pages} keyword={keyword.search} isAdmin={true} />
    </div>
  );
}

export default ProductListScreen;
