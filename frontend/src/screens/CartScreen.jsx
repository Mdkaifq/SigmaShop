import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removefromCart } from '../actions/cartActions'


function CartScreen() {
  const  productId = useParams()

  const qty = window.location.search ? Number(window.location.search.split('=')[1]):1

  const dispatch = useDispatch()

  useEffect(() => {
    if (productId.id) {
      dispatch(addToCart(productId.id, qty))
      
    }
  
   
  }, [dispatch, productId.id, qty])

  const navigate = useNavigate() 

  const removeFromCartHandler = (id) => {

    dispatch(removefromCart(id))

  };

  const checkOutHandler = () =>{

    const loggedIn = localStorage.getItem('userInfo')
    if(loggedIn){
      navigate('/shipping')
    }else{
      navigate('/login')
    }

  }
  
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  return (
   <Row>
    <Col md={8}>
    <h1>Shopping Cart</h1>
    {cartItems.length === 0 ? (<h3>
      Your Cart is empty <Link to='/'>Go Back</Link>
    </h3>): (<ListGroup variant='flush'>
      {cartItems.map(item=>(
<ListGroup.Item key={item.product}>
   <Row>
    <Col md={2}>
    <Image src={item.image} alt={item.name} fluid rounded/>
    </Col>
    <Col md={2} >
    <Link to={`/product/${item.product}`} >{ item.name }</Link>
    </Col>
    <Col md={2}>
        {item.price}
    </Col>

        <Col md={3} >
        <Form.Control as='select' className="form-select" value={item.qty}
          onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
            {
              [...Array(item.countInStock).keys()].map(x=>(
              
                <option key={x+1} value={x+1}>
                  {x+1}
                  
                </option>
                
                
              ))

            }
          </Form.Control>
        </Col>

      <Col md={1}>
      <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
            <i className='fas fa-trash'>
            </i>
      </Button>
      </Col>
   </Row>
</ListGroup.Item>

))}
    </ListGroup>)
}
</Col>
    <Col md={4}>
    <Card className='my-2'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Subtotal ({cartItems.reduce((acc, item)=> acc+item.qty, 0)})</h2>
          ₹{cartItems.reduce((acc, item)=> acc+item.qty*item.price, 0).toFixed(2)}
        </ListGroup.Item><ListGroup.Item >
    
    <Button type='button'
            className='my-0.5 mx-5 '
            disabled={cartItems.length===0}
            onClick={checkOutHandler}
    >
      Proceed To Checkout
    </Button>
    
    </ListGroup.Item>
      </ListGroup>
    

      
    </Card>
    </Col>
   </Row>
   
  )
}

export default CartScreen