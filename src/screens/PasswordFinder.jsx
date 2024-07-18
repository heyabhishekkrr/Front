import React, { useState } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';

const PasswordFinder = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Password for ${data.email} is: ${data.password}`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Password Finder</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button  style={{margin:"7px"}} variant="primary" type="submit">
          Find Password
        </Button>
      </Form>

      {message && (
        <div className="mt-3">
          <Alert  style={{overflow:"scroll"}} variant="info">{message}</Alert>
        </div>
      )}
    </div>
  );
};

export default PasswordFinder;
