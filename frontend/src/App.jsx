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
import RecordSalePage from './pages/SaleRecord';
import RecordPurchasePage from './pages/Purchase';
import Historypage from './pages/History'
import UpdateProductPage from './pages/UpdateProduct'
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import Supplier from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import UpdateSupplier from './pages/UpdateSupplier';
import ProductView from './pages/ProductView';
import ProductByCategory from './pages/ProductByCategory';
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
            <Route path="/add-category" element={<AddCategory onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/sale-record" element={<RecordSalePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/purchase-record" element={<RecordPurchasePage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/history" element={<Historypage onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/categories" element={<Categories onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/products/update/:productId" element={<UpdateProductPage />} />
            <Route path="/suppliers" element={<Supplier onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/add-supplier" element={<AddSupplier onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/update-supplier/:supplierId" element={<UpdateSupplier onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/view-product/:id" element={<ProductView onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/update-product/:id" element={<UpdateProductPage onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="/product-by-category/:id" element={<ProductByCategory onMenuClick={() => setIsMenuOpen(true)}/>} />
            <Route path="*" element ={<h1> page is not exist</h1>}/>  
          </Routes>       
        </main>
        {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;
