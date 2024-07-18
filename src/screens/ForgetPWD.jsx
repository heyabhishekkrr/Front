import React, { useState } from "react";
import { Form, Button,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useUpdatePWDMutation, useSendOTPMutation, useVerifyOTPMutation } from "../slices/userApiSlice";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";


const ForgetPWD = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOTP] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [activateButton, setActivateButton] = useState(false);
    const [remainingTime, setRemainingTime] = useState(10);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
    const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
    const [updatePWD, { isLoading: isUpdating }] = useUpdatePWDMutation();

    const handleSendOTP = async () => {
        try {
            const response = await sendOTP({ email });
            if (response.error) {
                toast.error("Failed to send OTP");
            } else {
                setOtpSent(true);
                toast.success("OTP sent successfully!");
                handleActivate();
            }
        } catch (error) {
            toast.error("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await verifyOTP({ email, otp });
            if (response.error) {
                toast.error(response.error.message);
            } else {
                setOtpVerified(true);
                toast.success("OTP verified successfully!");
            }
        } catch (error) {
            toast.error("Failed to verify OTP");
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            try {
                const response = await updatePWD({ email, newPassword });
                if (response.error) {
                    toast.error(response.error.message);
                } else {
                    toast.success("Password updated successfully!");
                    navigate("/dashboard");
                    setNewPassword("");  // Clear password fields after successful update
                    setConfirmPassword("");

                }
            } catch (error) {
                toast.error("Failed to update password");
            }
        }
    };

    const handleActivate = () => {
        setActivateButton(true);
        setRemainingTime(59);
        setTimeout(() => {
            setActivateButton(false);
        }, 59000); // 59000 milliseconds (59 seconds)
    };

    let buttonText = isVerifyingOTP ? <Loader /> : otpVerified ? "Verified" : "Verify";

    let btnOfResend = isSendingOTP ? <Loader /> : remainingTime > 0 ? `Resend in ${remainingTime}s` : "Resend Email OTP";

    return (
        <FormContainer>
            <h1>Change Password</h1>

            <Form onSubmit={handleUpdatePassword}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        disabled={otpVerified}
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                {!otpSent ? (
                    <Button onClick={handleSendOTP} variant="primary" className="mt-3" disabled={isSendingOTP}>
                        {isSendingOTP ? <Loader /> : "Send OTP Email"}
                    </Button>
                ) : (
                    <div>
                        <p>OTP sent successfully!</p>
                        <Form.Group className="my-2" controlId="otp">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                disabled={!otpSent || otpVerified}
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                            <Button
                                onClick={handleVerifyOTP}
                                style={{ margin: "2px" }}
                                variant={otpVerified ? "success" : "primary"}
                                disabled={otpVerified}
                            >
                                {buttonText}
                            </Button>
                            {!otpVerified && (
                                <Button
                                    onClick={handleSendOTP}
                                    variant="secondary"
                                    style={{ margin: "2px" }}
                                    disabled={remainingTime > 0}
                                >
                                    {btnOfResend}
                                </Button>
                            )}
                        </Form.Group>
                    </div>
                )}

                <Form.Group className="my-2" controlId="newpassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3" disabled={!otpVerified || isUpdating}>
                    {isUpdating ? <Loader /> : "Change Password"}
                </Button>
                <Row className='py-3'>
          <Col>
            Remembered? <Link to='/login'>Login</Link>
          </Col>
        </Row>
                <Row className='py-3'>
          <Col>
            New Customer? <Link to='/register'> Register</Link>
          </Col>
        </Row>
            </Form>
        </FormContainer>
    );
};

export default ForgetPWD;
