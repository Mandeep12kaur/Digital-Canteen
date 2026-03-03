import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    Clock,
    CheckCircle,
    ChefHat,
    MoreHorizontal,
    Plus,
    ArrowUpRight,
    Search,
    ChevronRight,
    Trash2,
    Edit3,
    LayoutDashboard,
    MapPin
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({ revenue: 0, count: 0, customers: 0 });
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Main Course',
        image: '',
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/orders', config);
            setOrders(data);
            const revenue = data.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
            const customers = new Set(data.map(o => o.user?._id || o.user)).size;
            setStats({ revenue, count: data.length, customers });
        } catch (error) { toast.error('Failed to sync data'); }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (error) { toast.error('Menu failed to load'); }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            const init = async () => {
                setLoading(true);
                await Promise.all([fetchOrders(), fetchProducts()]);
                setLoading(false);
            };
            init();
            const socket = io('http://localhost:5000');
            socket.on('new_order', () => fetchOrders());
            return () => socket.disconnect();
        } else {
            setLoading(false);
        }
    }, [user]);

    const updateStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
            fetchOrders();
            toast.success(`Sync Success: ${status}`);
        } catch (error) { toast.error('Update failed'); }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, config);
                toast.success('Product updated');
            } else {
                await axios.post('http://localhost:5000/api/products', formData, config);
                toast.success('Product created');
            }
            fetchProducts();
            setShowModal(false);
            setEditingProduct(null);
            setFormData({ name: '', price: '', description: '', category: 'Main Course', image: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this item from inventory?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/products/${id}`, config);
            toast.success('Item removed');
            fetchProducts();
        } catch (error) { toast.error('Delete failed'); }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
        });
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                <p className="text-sm font-black text-slate-800 uppercase tracking-[0.3em]">Syncing Terminal...</p>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] p-10 text-center">
                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-red-500/10">
                    <ShieldCheck size={48} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Access Denied</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                    This terminal is restricted to campus administrators. Please verify your credentials or contact tech support.
                </p>
                <Link to="/" className="mt-10 btn-modern btn-modern-primary px-10">Return to Safety</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 px-10 pb-12 bg-[#f8fafc] min-h-screen max-w-[1600px] mx-auto space-y-16">
            {/* Welcome Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter text-slate-900">Control Center</h1>
                    <p className="text-slate-500 font-medium text-xl mt-3 italic">Monitoring real-time campus culinary lifecycle with advanced telemetry.</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-modern bg-white border border-slate-200 text-slate-700 shadow-xl hover:bg-slate-50 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest">
                        <Search size={22} /> Search
                    </button>
                    <button
                        onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', description: '', category: 'Main Course', image: '' }); setShowModal(true); }}
                        className="btn-modern btn-modern-primary px-10 py-4 rounded-2xl text-lg"
                    >
                        <Plus size={22} /> Add New Dish
                    </button>
                </div>
            </div>

            {/* Metrics Grid: Exactly 2 Columns with reduced scaling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Total Revenue Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group min-h-[300px]">
                    <div className="h-20 bg-gradient-to-br from-indigo-500 to-violet-600" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 border-4 border-white">
                        <TrendingUp className="text-indigo-600" size={28} />
                    </div>
                    <div className="pt-10 px-8 pb-8 text-center flex-1 flex flex-col items-center">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Revenue</h3>
                        <p className="text-slate-400 text-[10px] font-extrabold mb-4 italic uppercase tracking-[0.3em]">Total Earnings</p>
                        <div className="mt-auto w-full space-y-4">
                            <div className="py-4 rounded-[20px] bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-3xl font-black shadow-xl shadow-indigo-500/20">
                                ₹{stats.revenue.toFixed(2)}
                            </div>
                            <button className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-indigo-600 transition-colors">Performance +12%</button>
                        </div>
                    </div>
                </motion.div>

                {/* Active Orders Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group min-h-[300px]">
                    <div className="h-20 bg-gradient-to-br from-amber-400 to-orange-500" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 border-4 border-white">
                        <ShoppingBag className="text-amber-500" size={28} />
                    </div>
                    <div className="pt-10 px-8 pb-8 text-center flex-1 flex flex-col items-center">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Active</h3>
                        <p className="text-slate-400 text-[10px] font-extrabold mb-4 italic uppercase tracking-[0.3em]">Live Orders Now</p>
                        <div className="mt-auto w-full space-y-4">
                            <div className="py-4 rounded-[20px] bg-gradient-to-r from-amber-400 to-orange-500 text-white text-3xl font-black shadow-xl shadow-amber-500/20">
                                {stats.count}
                            </div>
                            <button className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-amber-600 transition-colors">Kitchen Queue</button>
                        </div>
                    </div>
                </motion.div>

                {/* Customers Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group min-h-[300px]">
                    <div className="h-20 bg-gradient-to-br from-emerald-400 to-teal-500" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 border-4 border-white">
                        <Users className="text-emerald-500" size={28} />
                    </div>
                    <div className="pt-10 px-8 pb-8 text-center flex-1 flex flex-col items-center">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Users</h3>
                        <p className="text-slate-400 text-[10px] font-extrabold mb-4 italic uppercase tracking-[0.3em]">Global Reach</p>
                        <div className="mt-auto w-full space-y-4">
                            <div className="py-4 rounded-[20px] bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-3xl font-black shadow-xl shadow-emerald-500/20">
                                {stats.customers}
                            </div>
                            <button className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-emerald-600 transition-colors">Satisfaction Rate</button>
                        </div>
                    </div>
                </motion.div>

                {/* Status Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group min-h-[300px]">
                    <div className="h-20 bg-gradient-to-br from-rose-500 to-red-600" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 border-4 border-white">
                        <ChefHat className="text-rose-600" size={28} />
                    </div>
                    <div className="pt-10 px-8 pb-8 text-center flex-1 flex flex-col items-center">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Stability</h3>
                        <p className="text-slate-400 text-[10px] font-extrabold mb-4 italic uppercase tracking-[0.3em]">System Health</p>
                        <div className="mt-auto w-full space-y-4">
                            <div className="py-4 rounded-[20px] bg-gradient-to-r from-rose-500 to-red-600 text-white text-3xl font-black shadow-xl shadow-rose-500/20">
                                99.9%
                            </div>
                            <button className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-rose-600 transition-colors">Ops Running</button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="dashboard-grid">
                {/* Dynamic Spread Area - Orders vs Menu Inventory */}
                <div className="col-span-12 lg:col-span-8 space-y-8" id="control-stream">
                    <div className="card-vibrant !p-0 overflow-hidden border-indigo-100 shadow-xl shadow-indigo-500/5">
                        <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-50">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                Processing Stream
                            </h3>
                            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                                {['orders', 'inventory'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {activeTab === 'orders' ? (
                                <table className="w-full text-left">
                                    <thead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50">
                                        <tr>
                                            <th className="px-8 py-5">Ref / Timestamp</th>
                                            <th className="px-8 py-5">Customer Profile</th>
                                            <th className="px-8 py-5">Lifecycle Status</th>
                                            <th className="px-8 py-5 text-right">Workflow Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {orders.slice(0, 8).map((order) => (
                                            <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-mono text-xs font-black text-indigo-600 mb-1">#{order.orderId}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-slate-800 text-sm mb-1">{order.user?.name || 'Unknown User'}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
                                                        <MapPin size={10} className="text-indigo-500" /> {order.pickupLocation || 'Main Canteen'}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-medium">${order.totalAmount.toFixed(2)} Total Bill</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                                        order.status === 'Ready' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {order.status === 'Pending' && <button onClick={() => updateStatus(order._id, 'Cooking')} className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all"><ChefHat size={18} /></button>}
                                                        {order.status === 'Cooking' && <button onClick={() => updateStatus(order._id, 'Ready')} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"><CheckCircle size={18} /></button>}
                                                        {order.status === 'Ready' && <button onClick={() => updateStatus(order._id, 'Completed')} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all"><CheckCircle size={18} /></button>}
                                                        <button className="p-2.5 text-slate-300 hover:text-slate-600 transition-all"><MoreHorizontal size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
                                    {products.map(product => (
                                        <div key={product._id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <img src={product.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={product.name} />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category} • ${product.price}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', description: '', category: 'Main Course', image: '' }); setShowModal(true); }}
                                        className="flex items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
                                    >
                                        <Plus size={20} className="mr-2" /> Add Item
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 bg-slate-50 flex items-center justify-center border-t border-slate-100">
                            <button className="text-xs font-black uppercase text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all">
                                View Full Logs <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Side Summary Cards */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Urgent Alerts Card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-amber-100 flex flex-col group">
                        <div className="h-20 bg-gradient-to-br from-amber-400 to-orange-500" />
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-white">
                            <Clock className="text-amber-500" size={20} />
                        </div>
                        <div className="pt-8 px-6 pb-6 text-center flex-1">
                            <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center justify-center gap-2">
                                Priority Alerts
                            </h4>
                            <div className="space-y-3">
                                {orders.filter(o => o.status === 'Pending').slice(0, 3).map(o => (
                                    <div key={o._id} className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-left">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-black text-slate-800 truncate">ACTION REQ: #{o.orderId}</p>
                                            <p className="text-[10px] text-slate-500 font-bold truncate">{o.user?.name?.split(' ')[0] || 'User'} waiting</p>
                                        </div>
                                        <button onClick={() => updateStatus(o._id, 'Cooking')} className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black rounded-lg hover:bg-amber-600 transition-colors">START</button>
                                    </div>
                                ))}
                                {!orders.filter(o => o.status === 'Pending').length && (
                                    <p className="text-xs text-slate-400 font-bold italic py-4">Kitchen status: Optimal</p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Admin Resources Card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group">
                        <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-900" />
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-white">
                            <LayoutDashboard className="text-slate-800" size={20} />
                        </div>
                        <div className="pt-8 px-6 pb-6 text-center flex-1">
                            <h4 className="text-lg font-black text-slate-800 mb-4">Staff Tools</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => { setActiveTab('inventory'); document.getElementById('control-stream')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all group/link border border-transparent hover:border-indigo-100"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest">Inventory</span>
                                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 transition-all group/link border border-transparent hover:border-emerald-100"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest">Analytics</span>
                                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/security')}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 transition-all group/link border border-transparent hover:border-rose-100"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest">Support</span>
                                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                    {editingProduct ? 'Update Dish' : 'New Culinary Entry'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-2xl">&times;</button>
                            </div>

                            <form onSubmit={handleProductSubmit} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Dish Name</label>
                                        <input
                                            required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="e.g. Spicy Ramen"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Price ($)</label>
                                        <input
                                            required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="12.99"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Category</label>
                                        <select
                                            value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        >
                                            {['Main Course', 'Snacks', 'Drinks', 'Desserts', 'Breakfast'].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Image URL</label>
                                    <input
                                        required type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://unsplash.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
                                    <textarea
                                        required rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" placeholder="Describe the flavors..."
                                    />
                                </div>

                                <button type="submit" className="w-full btn-modern btn-modern-primary py-4 shadow-xl shadow-indigo-500/20 mt-4">
                                    {editingProduct ? 'Synchronize Updates' : 'Initialize Dispatch'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
