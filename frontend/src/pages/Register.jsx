// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
        storeName,
        storeCategory,
      });

      alert('Register successfully');
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center bg-green-700 h-screen text-white font-sans p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center w-full max-w-md">
        <div className="mb-4">
          <h1 className="text-xl text-green-700 font-bold mb-1">Register</h1>
          <p className="text-sm text-green-700">Inventor.io</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-3">
          <label htmlFor="username" className="block text-left text-green-700 font-medium">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <label htmlFor="email" className="block text-left text-green-700 font-medium">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <label htmlFor="password" className="block text-left text-green-700 font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <label htmlFor="storeName" className="block text-green-700 text-left font-medium">Store Name</label>
          <input
            id="storeName"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <label htmlFor="storeCategory" className="block text-green-700 text-left font-medium">Store Category</label>
          <input
            id="storeCategory"
            type="text"
            value={storeCategory}
            onChange={(e) => setStoreCategory(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-2 text-sm font-bold bg-green-700 border-none rounded text-white cursor-pointer transition duration-100 ease-in transform hover:scale-[1.02] hover:bg-green-700 hover:text-white shadow"
          >
            Register
          </button>
          <p className="mt-3 text-gray-500 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="bg-transparent border-none text-green-700 cursor-pointer text-sm font-bold p-0 hover:underline"
            >
              Log In
            </button>
          </p>
          {error && (
            <p className="mt-2 text-red-500 text-sm">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
