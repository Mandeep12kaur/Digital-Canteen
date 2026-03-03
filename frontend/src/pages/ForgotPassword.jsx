import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            toast.success(data.message);
            setSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="bg-white p-10 rounded-2xl border border-border shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Send size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Recovery Center</h2>
                        <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
                            {sent
                                ? "If an account exists, we've dispatched a recovery link to your console/email."
                                : "Enter your email address to receive a secure password reset link."}
                        </p>
                    </div>

                    {!sent ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <label className="block text-[10px] font-black text-slate-400 font-bold uppercase tracking-[0.2em] mb-2 ml-1">Email Terminal</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
                                        placeholder="yourname@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-modern btn-modern-primary py-4 px-4 flex justify-center items-center gap-2"
                            >
                                {loading ? 'Dispatching...' : 'Send Recovery Link'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                                <p className="text-xs font-bold text-emerald-700">Check your email (and the backend console for the simulation link) to continue.</p>
                            </div>
                            <button
                                onClick={() => setSent(false)}
                                className="w-full py-4 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                            >
                                Use a different email
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center pt-6 border-t border-slate-50">
                        <Link to="/login" className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2 uppercase tracking-widest">
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
