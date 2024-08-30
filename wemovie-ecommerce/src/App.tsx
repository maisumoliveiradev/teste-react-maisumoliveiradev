import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsList from './components/ProductList'
import Cart from './components/Cart'
import '../global.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
