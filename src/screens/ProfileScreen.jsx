import { useState, useEffect } from "react";
import { Form,} from "react-bootstrap";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
// import { setCredentials } from "../slices/authSlice";
// import { useUpdateProfileMutation } from "../slices/userApiSlice";

import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  



  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  return (
    <FormContainer>
      <h1>Profile</h1>

      <Form >
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
          disabled={true}
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address </Form.Label>
          <Form.Control
          disabled={true}
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

       

      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
