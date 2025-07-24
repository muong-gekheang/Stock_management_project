import Products from './components/Products'
import ProductInfo from './components/ProductInfo'
import Sale from './components/Sale'
import Categories from './components/Categories'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductByCategory from './components/ProductsByCategory'
import RevenueDashboard from './components/RevenueDashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Product Management System</h1>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productCode" element={<ProductInfo />} />
        <Route path="/product/:productCode/sale" element={<Sale />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryCode" element={<ProductByCategory />} />
        <Route path="/Revenue" element={<RevenueDashboard />} />
      </Routes>
    </>
  )
}

export default App
