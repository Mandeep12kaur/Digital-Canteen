import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [pickupLocation, setPickupLocation] = useState('Main Canteen');

    const locations = [
        'Main Canteen',
        'Academic Block A',
        'Academic Block B',
        'Library Square',
        'Hostel Gate 1'
    ];

    const handleCheckout = async () => {
        if (!user) {
            toast.error('Identity verification required');
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/orders',
                { orderItems: cartItems, totalAmount: cartTotal, pickupLocation },
                config
            );

            clearCart();
            toast.success('Order synchronized with kitchen!');
            navigate(`/track/${data._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Checkout protocol failed');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 px-6 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-vibrant bg-white border-dashed border-2 p-16"
                >
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your cart is silent.</h2>
                    <p className="text-slate-500 font-medium mb-10">Explore our digital menu to find your next favorite meal.</p>
                    <Link to="/menu" className="btn-modern btn-modern-primary py-4 px-10">
                        Explore Varieties
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
                <Link to="/menu" className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Checkout</h2>
                    <p className="text-slate-500 font-medium">Review your selection before sync.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="card-vibrant bg-white !p-6 flex flex-col sm:flex-row items-center gap-8 border-slate-50 shadow-lg shadow-slate-200/20 hover:border-indigo-100"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 rounded-2xl object-cover shadow-md"
                                />
                                <div className="flex-1 text-center sm:text-left">
                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 block">{item.category}</span>
                                    <h3 className="text-xl font-extrabold text-slate-800 mb-4">{item.name}</h3>
                                    <div className="flex items-center justify-center sm:justify-start gap-6">
                                        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                            <button
                                                onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                                                className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 shadow-sm hover:shadow-md"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-10 text-center text-sm font-black text-slate-800">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item._id, item.qty + 1)}
                                                className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 shadow-sm hover:shadow-md"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-slate-300 p-2 hover:text-danger hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center sm:text-right">
                                    <div className="text-2xl font-black text-slate-900 leading-none mb-1">₹{(item.price * item.qty).toFixed(2)}</div>
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">${item.price} UNIT</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="card-vibrant !p-8 sticky top-32 border-indigo-100 shadow-2xl shadow-indigo-500/10">
                        <h3 className="text-xl font-black text-slate-800 mb-8 pb-5 border-b border-slate-50">Order Summary</h3>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="text-slate-800">₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Processing Fee</span>
                                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg text-[10px]">WAIVED</span>
                            </div>
                            <div className="pt-5 border-t border-slate-50">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Pickup Location</label>
                                <div className="relative">
                                    <select
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    >
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <Truck size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-slate-50 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Final Amount</span>
                                    <span className="text-4xl font-black text-indigo-600 leading-none tracking-tighter">₹{cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full btn-modern btn-modern-primary py-5 text-lg shadow-xl shadow-indigo-500/20"
                        >
                            <CreditCard size={20} /> Complete Order
                        </button>

                        <div className="mt-8 flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                <ShieldCheck size={14} /> Encrypted Verification
                            </div>
                            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                                By completing this order, you agree to the campus dining protocol and pickup conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
