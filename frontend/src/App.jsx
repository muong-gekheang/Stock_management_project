// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css'

// Pages
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import ProfilePage from './pages/MyProfile';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="relative">
        <main>
          <Routes>
            <Route path="/" element={<Dashboard onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<Product onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/profile" element={<ProfilePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/add-product" element={<AddProduct onMenuClick={() => setIsMenuOpen(true)} />} />
          </Routes>
        </main>
        {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;