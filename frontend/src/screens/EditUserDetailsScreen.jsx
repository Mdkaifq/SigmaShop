import { Form, Button } from "react-bootstrap";
import { getUserDetails, updateUser } from "../actions/userActions.jsx";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer.jsx";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../constants/userConstants.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

function EditUserDetailsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: user._id, name, email, isAdmin}))
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success } = userUpdate;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if(success){

      dispatch({type: USER_UPDATE_RESET})
      navigate('/admin/userlist')
    }else{

      
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
      console.log(id);
    }, [user, id, success, navigate, dispatch]);
    
  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader/>
        ) : error ? (
          <Message variant='danger' children={error}/>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label className="my-1">Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="my-1">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="IsAdmin">
              <Form.Check
                className="my-3"
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <center>
              <Button hover  type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </center>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default EditUserDetailsScreen;
