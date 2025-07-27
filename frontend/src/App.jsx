import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css'

// Pages
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/Product';
import AddProduct from './pages/AddProduct';
import ProfilePage from './pages/MyProfile';
import RecordSalePage from './pages/SaleRecord';
import RecordPurchasePage from './pages/Purchase';
import TransactionPage from './pages/Transaction'
import UpdateProductPage from './pages/UpdateProduct';

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
            <Route path="/products" element={<ProductPage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/profile" element={<ProfilePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/add-product" element={<AddProduct onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/sale-record" element={<RecordSalePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/purchase-record" element={<RecordPurchasePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/transactions" element={<TransactionPage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/products/update/:productId" element={<UpdateProductPage onMenuClick={() => setIsMenuOpen(true)} />} />
          </Routes>
        </main>
        {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;
