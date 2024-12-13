import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess('Registration successful. You can now log in.');
        setError('');
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-accent mb-6 text-center">Register</h1>
        {error && <p className="text-red-700 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <input
          className="border-accent text-accent w-full p-2 mb-4 border rounded"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-accent text-accent w-full p-2 mb-4 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-accent text-white w-full p-2 rounded hover:bg-purple-700 transition duration-300"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;