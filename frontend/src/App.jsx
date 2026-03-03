import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders';
import Roadmap from './pages/Roadmap';
import Security from './pages/Security';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="min-h-screen bg-[#f8fafc]">
                        <Navbar />
                        <main className="transition-all">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/track/:orderId" element={<OrderTracking />} />
                                <Route path="/orders" element={<MyOrders />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/roadmap" element={<Roadmap />} />
                                <Route path="/security" element={<Security />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password/:token" element={<ResetPassword />} />
                            </Routes>
                        </main>
                        <Toaster position="bottom-right" />
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
