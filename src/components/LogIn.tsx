import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../SessionStorageManager';
import { useNavigate } from 'react-router-dom';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { saveToken } = useAuth();  

  // Validate form inputs
  const validateForm = (): boolean => {
    if (!username || !password) {
      setError('Both username and password are required.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Make the API request to login
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      // On successful login, store the JWT token in sessionStorage
      if (response.data.token) {
        saveToken(response.data.token);
        setError('');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
      navigate('/dashboard')
    }
  };

  return (
    <Container>
      <h2 className="my-4">Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="mt-3"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </Button>
      </Form>
    </Container>
  );
};

export default LogIn;
