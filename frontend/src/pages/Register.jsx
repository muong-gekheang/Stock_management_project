import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch ('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
        StoreName: storeName,
        StoreCategory: storeCategory
      })

      })

      const data = await response.json();
      if (response.ok) {
        alert("Registered successfully! You can now log in.");
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="flex justify-center items-center bg-[#6E53AB] h-screen text-white font-sans">
      <div className="bg-white p-8 md:px-12 rounded-lg shadow-xl text-center w-full max-w-lg">
        <div className="mb-6">
          <h1 className="text-3xl text-[#6E53AB] font-bold mb-1">Register</h1>
          <p className="text-lg text-[#6E53AB]">Inventor.io</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4"> {/* Added space-y-4 for consistent vertical spacing */}
          <label htmlFor="username" className="block text-left text-[#6E53AB] font-medium text-lg">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[100%] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          /><br />

          <label htmlFor="email" className="block text-left text-[#6E53AB] font-medium text-lg">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          /><br />

          <label htmlFor="password" className="block text-left text-[#6E53AB] font-medium text-lg">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          /><br />
          <label htmlFor="storeName" className="block text-[#6E53AB] text-left font-medium text-lg">Store Name</label>
          <input
            id="storeName"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-[100%] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          /><br />
          <label htmlFor="storeCategory" className="block text-[#6E53AB] text-left font-medium text-lg">Store Category</label>
          <input
            id="storeCategory"
            type="text"
            value={storeCategory}
            onChange={(e) => setStoreCategory(e.target.value)}
            className="w-[100%] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          /><br /><br/>
          <button type="submit" className='w-full py-3.5 text-base font-bold bg-[#6E53AB] border-none rounded-lg text-white cursor-pointer mt-5 transition duration-100 ease-in transform hover:scale-105 hover:bg-[#574289] hover:text-white shadow-md'>
            Register
          </button>
          <p className="mt-4 text-gray-500 text-base">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="bg-transparent border-none text-[#6E53AB] cursor-pointer text-base font-bold p-0 hover:underline hover:text-[#574289]">
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
