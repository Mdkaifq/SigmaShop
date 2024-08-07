import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions.jsx'
import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState('')

    const submitHandler= (e) =>{
        e.preventDefault()
        if(password!==confirmPassword){
            setmessage('Passwords do not match')
        }else{

            dispatch(register(name, email, password))
        }
    
    }
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
      
    if (userInfo) {
        navigate(redirect)
    }
    
    }, [userInfo, redirect, navigate])
    
    

  return (
    <FormContainer>
        <h1>Register</h1>
        {loading && <Loader/>}
        {error && <Message variant='danger' children={error} />}
        {message && <h3>{message}</h3>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>

<Form.Label className='my-1' >Name</Form.Label>
<Form.Control required type='name' placeholder='enter your Name' value={name} onChange={(e)=>setName(e.target.value)}>
     
</Form.Control>
</Form.Group>


    <Form.Group controlId='email'>

        <Form.Label className='my-1' >Email</Form.Label>
        <Form.Control required type='email' placeholder='enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
             
        </Form.Control>
    </Form.Group>

    <Form.Group controlId='password'>

<Form.Label className='my-1'>Password</Form.Label>
<Form.Control required type='password' placeholder='enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>
     
</Form.Control>
</Form.Group>

<Form.Group controlId='passwordConfirm'>

<Form.Label className='my-1'>Confirm Password</Form.Label>
<Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
     
</Form.Control>
</Form.Group>
    <center >
        
    <Button type='submit' variant='primary' className='my-2'>register</Button>
    </center>

        </Form>
    <Row className='py-3'>

        <Col>
        Already have an account? <Link to={redirect ?  `/login?redirect=${redirect}` : '/login'}>
         Click here to Sign-in
        </Link>
        
        </Col>

    </Row>
    </FormContainer>
  )
}

export default RegisterScreen