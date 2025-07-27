import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', {
        Username,
        Password
      });
      
      localStorage.setItem('token', data.token)
      alert('login successfully')
      navigate('/')
      
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // use backend's message
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <div className="flex justify-center items-center bg-green-700 h-screen text-white font-sans">
      <div className="bg-white p-12 md:px-15 rounded-2xl shadow-2xl text-center w-full max-w-lg">
        <div className="mb-10">
          <h1 className="text-4xl text-green-700 font-extrabold mb-2">Login</h1>
          <p className="text-xl text-green-700 col-">Inventor.io</p>
        </div>

        {/* Username Input */}
        <form onSubmit={handleLogin}>
          <div className="mb-6 text-left">
            <label className="block text-green-700 font-semibold text-lg mb-1">Username</label>
            <input
              type="text"
              placeholder="username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-10 text-left">
            <label className="block text-green-700 font-semibold text-lg mb-1">Password</label>
            <input
              type="password"
              placeholder="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {error && <p className="text-red-300 mb-4">{error}</p>}

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full py-3 text-lg font-bold bg-green-700 border-none rounded-xl text-white mt-8 cursor-pointer transition duration-150 ease-in-out transform hover:scale-105 hover:bg-green-800 hover:text-white shadow-lg">
            Log In
          </button>

          {/* Register Link */}
          <p className="mt-6 text-gray-500 text-base">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={handleRegisterClick}
              className="bg-transparent border-none text-green-700 cursor-pointer text-base font-bold p-0 hover:underline">
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

