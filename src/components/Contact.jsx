import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useContactMutation, useSendOTPMutation, useVerifyOTPMutation } from "../slices/userApiSlice"; // Ensure correct import path

import { setCredentials } from "../slices/authSlice";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  

  // Destructure the useSendOTPMutation hook and access isLoading as isSendingOTP
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const [contact, { isLoading: isRegistering }] = useContactMutation();




  // add button of resend 
  
  // const [buttonActive, setButtonActive] = useState(false);
  const [activateButton, setActivateButton] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10); // Initial remaining time in seconds

 






  const { userInfo } = useSelector((state) => state.auth);

 if(userInfo){
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }, [userInfo.email, userInfo.name]);
 
      

 }

  const handleSendOTP = async () => {
    try {
      const response = await sendOTP({ email, otp });
      if (response.error) {
        // toast.error(response.error.message);
        toast.error("Something Wrong");
        console.log(response.error);
      } else {
        console.log("OTP Sent");
        setOtpSent(true); // Update otpSent state upon successful send
        toast.success("OTP sent successfully!");
        handleActivate();


      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }


  };
 useEffect(() => {
    let countdownInterval;

    if (activateButton) {
      countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countdownInterval);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000); // Update timer every second (1000 milliseconds)
    }

    return () => clearInterval(countdownInterval);
  }, [activateButton]);


  const handleActivate = () => {
    setActivateButton(true);
    setRemainingTime(59);

    setTimeout(() => {

    }, 59000); // 10000 milliseconds (10 seconds)
  };


  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP({ email, otp });
      if (response.error) {
        toast.error(response.error.message);
        toast.error("Something Went Wrong...");
      } else {
        setOtpVerified(true);
        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  const contatmessage = async () => {
    try {
      const res = await contact({ name, email, message}).unwrap();
      

      toast.success("Message Sent")
      
    } catch (error) {
      toast.error(error?.data?.message || "Error Occured");
    }
   
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }
    contatmessage();
  }


  let buttonText = isVerifyingOTP ? (
    <Loader />
  ) : (
    otpVerified ? "Verified" : "Verify"
  );



  let btnofresend = isSendingOTP ? (
    <Loader />
  ) : (
    remainingTime>0 ? `Resend in ${remainingTime}s` : 'Resend Email OTP'
  );



  return (
   
       <FormContainer style={{padding:"2vw"}}>
      <h1>Contact Portioabhi.</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            disabled={otpVerified}
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            disabled={otpVerified}
            type='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {!otpSent ? (
          <Button onClick={handleSendOTP} variant='primary' className='mt-3' disabled={isSendingOTP}>
            {isSendingOTP ? <Loader /> : "Verfy Email by OTP"}
          </Button>
        ) : (
          <div>
            <p>OTP sent successfully!</p>
            <Form.Group className='my-2' controlId='otp'>
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                disabled={otpVerified}
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              <Button onClick={handleVerifyOTP} style={{ margin: "2px" }} variant={otpVerified ? "success" : "primary"} disabled={otpVerified} >
                {buttonText}
              </Button>
              {otpVerified?( <></> ):(
              <Button onClick={handleSendOTP} variant='secondary' style={{ margin: "2px" }} disabled={otpVerified || remainingTime>0}>
              {btnofresend}
              </Button>
              )}
            </Form.Group>
          </div>
        )}
  <Form.Group className="mb-3 my-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} value={message}
            onChange={(e) => setMessage(e.target.value)}/>
      </Form.Group>
      
        <Button type='submit' variant='primary' className='mt-3' disabled={!otpVerified}>
          {isRegistering ? <Loader /> : "Send Message"}
        </Button>

        <Row className='py-3'>
          <Col>
            Go Home? <Link to='/'>Home</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
   
  );
};
export default Contact;