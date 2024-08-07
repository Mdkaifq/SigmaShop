import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listProducts } from "../actions/productActions.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";


function HomeScreen() {
  let keyword = useLocation().search
  let searchQuery = new URLSearchParams(keyword).get('keyword')
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  useEffect(() => {
    
      console.log(keyword)
      dispatch(listProducts(keyword));
    
    
  }, [dispatch, keyword ]);
 

  return (
    <div>
      {!searchQuery && <ProductCarousel/> }
      
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <div>

        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={12} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        
      )}
    </div>
  );
}

export default HomeScreen;
