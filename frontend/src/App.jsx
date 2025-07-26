import Products from './components/Products'
import ProductInfo from './components/ProductInfo'
import Sale from './components/Sale'
import Categories from './components/Categories'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductByCategory from './components/ProductsByCategory'
import RevenueDashboard from './components/RevenueDashboard'
import Menu from './components/Menu'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/MyProfile'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import SaleRecord from './pages/SaleRecord'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Product Management System</h1>} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductInfo />} />
        <Route path="/product/:productId/sale" element={<Sale />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<ProductByCategory />} />
        <Route path="/Revenue" element={<RevenueDashboard />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sale-record" element={<SaleRecord />}/>
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
