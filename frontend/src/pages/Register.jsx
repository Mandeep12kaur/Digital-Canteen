import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, ShieldPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(name, email, password);
        if (result.success) {
            toast.success('Account verified and established!', {
                icon: '🛡️',
                style: { borderRadius: '15px', background: '#333', color: '#fff' }
            });
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-20 px-6 bg-[#f8fafc]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="card-vibrant bg-white p-12 shadow-2xl shadow-indigo-500/10 border-indigo-50">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <ShieldPlus size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Join CampusCrave</h2>
                        <p className="text-slate-500 font-medium mt-2">Initialize your dining credentials.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Identity Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-slate-800 font-medium text-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Corporate Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-slate-800 font-medium text-sm"
                                        placeholder="you@google.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Access Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-slate-800 font-medium text-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-modern btn-modern-primary py-4 text-sm font-black shadow-lg shadow-indigo-500/20 group justify-center"
                        >
                            {loading ? 'Processing...' : (
                                <>Establish Account <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-500 text-xs font-medium">
                            Existing credentials?{' '}
                            <Link to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
