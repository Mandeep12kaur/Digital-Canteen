import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Clock, Package, CheckCircle, ChevronRight, ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'text-amber-500 bg-amber-50';
            case 'Cooking': return 'text-indigo-500 bg-indigo-50';
            case 'Ready': return 'text-emerald-500 bg-emerald-50';
            case 'Completed': return 'text-slate-400 bg-slate-50';
            default: return 'text-slate-500 bg-slate-100';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Order History</p>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
                <Link to="/menu" className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">My Orders</h2>
                    <p className="text-slate-500 font-medium">Tracking your culinary journey.</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="card-vibrant bg-white text-center p-20 py-32">
                    <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">No orders yet</h3>
                    <p className="text-slate-500 mb-10">Your order history will appear once you make your first purchase.</p>
                    <Link to="/menu" className="btn-modern btn-modern-primary py-4 px-10">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={order._id}
                            className="card-vibrant bg-white group hover:border-indigo-100 transition-all shadow-xl shadow-slate-200/20"
                        >
                            <Link to={`/track/${order._id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${getStatusColor(order.status)}`}>
                                        {order.status === 'Pending' && <Clock size={28} />}
                                        {order.status === 'Cooking' && <Package size={28} />}
                                        {order.status === 'Ready' && <CheckCircle size={28} />}
                                        {order.status === 'Completed' && <CheckCircle size={28} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-black text-indigo-600 tracking-tighter uppercase">#{order.orderId}</span>
                                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-black text-slate-800">
                                            {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} • ${order.totalAmount.toFixed(2)}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                            <MapPin size={12} /> {order.pickupLocation}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-6 md:pt-0">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ordered On</p>
                                        <p className="text-sm font-bold text-slate-700">
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
