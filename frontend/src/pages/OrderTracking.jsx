import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, CheckCircle, ChefHat, Package, MapPin, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const steps = [
        { label: 'Confirmed', status: 'Pending', icon: <Clock /> },
        { label: 'Processing', status: 'Cooking', icon: <ChefHat /> },
        { label: 'Ready', status: 'Ready', icon: <Package /> },
        { label: 'Settled', status: 'Completed', icon: <CheckCircle /> }
    ];

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, config);
                setOrder(data);
            } catch (error) { console.error('Failed to fetch order'); }
            finally { setLoading(false); }
        };

        fetchOrder();
        const socket = io('http://localhost:5000');
        socket.emit('join_order_room', orderId);
        socket.on('order_status_updated', (updated) => setOrder(updated));
        return () => socket.disconnect();
    }, [orderId]);

    if (loading) return <div className="flex justify-center py-40 animate-pulse text-primary font-bold">Initializing Order Stream...</div>;
    if (!order) return <div className="text-center py-40 font-bold text-danger">ORDER NOT FOUND.</div>;

    const currentStep = steps.findIndex(s => s.status === order.status);

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-10">
                <Link to="/menu" className="p-2 hover:bg-gray-100 rounded-lg text-text-muted"><ArrowLeft size={24} /></Link>
                <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Order Lifecycle</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-16">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center flex-1 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${idx <= currentStep ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-300'
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-secondary' : 'text-gray-300'}`}>
                                        {step.label}
                                    </span>

                                    {idx < steps.length - 1 && (
                                        <div className="absolute top-7 left-1/2 w-full h-[2px] bg-gray-50 -z-10">
                                            <div className={`h-full bg-primary transition-all duration-1000 ${idx < currentStep ? 'w-full' : 'w-0'}`}></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Pickup Location</p>
                                <p className="text-sm font-bold text-secondary">{order.pickupLocation || 'Main Canteen'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Order Manifest
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-secondary">
                                            {item.quantity}x
                                        </div>
                                        <span className="font-medium text-gray-700">{item.product.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">${(item.priceAtOrder * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-bold text-text-muted uppercase">Total Settled</span>
                            <span className="text-2xl font-black text-secondary">${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-10 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 flex flex-col items-center text-center">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Scan For Pickup</h3>
                        <div className="p-4 bg-white border-4 border-gray-50 rounded-3xl mb-8">
                            <QRCodeSVG value={order.qrCode} size={180} />
                        </div>
                        <p className="text-xs text-text-muted font-medium leading-relaxed">
                            Show this QR at the counter <br /> to authorize your collection.
                        </p>
                    </div>

                    <div className="bg-secondary p-8 rounded-2xl text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <MapPin size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Order Ref</span>
                        </div>
                        <p className="font-mono text-xl font-bold mb-6">#{order.orderId}</p>
                        <Link to="/menu" className="w-full bg-white text-secondary py-3.5 rounded-xl font-black text-sm text-center block hover:bg-gray-50 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
