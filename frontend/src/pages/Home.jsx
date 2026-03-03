import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, LayoutGrid, Clock, Utensils, ShieldCheck, Sparkles } from 'lucide-react';

const Home = () => {
    return (
        <div className="py-12 px-8 max-w-[1500px] mx-auto space-y-24">
            {/* Header Badge */}
            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 shadow-sm"
                >
                    <Sparkles size={14} className="animate-pulse" /> The Future of Campus Dining is Here
                </motion.div>
            </div>

            {/* Hero Section: Overlapping Square Cards - Wider Footprint */}
            <div className="relative flex justify-center items-center h-[380px] mb-12">
                {/* Secondary Accent Square */}
                <motion.div
                    initial={{ opacity: 0, rotate: 12, x: 100 }}
                    animate={{ opacity: 1, rotate: 6, x: 80 }}
                    className="absolute w-72 h-72 bg-violet-600/5 border border-violet-200 rounded-[40px] -z-10"
                />

                {/* Primary Hero Horizontal Card - Expanded to fill 1500px container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 0.998 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="card-vibrant w-full max-w-[1380px] bg-white flex flex-col md:flex-row justify-between items-center text-center md:text-left p-12 md:p-20 relative z-10 border-indigo-50 shadow-2xl shadow-indigo-500/10 min-h-[360px] gap-16"
                >
                    <div className="relative z-20 flex-[1.5] flex flex-col items-center md:items-start">
                        <motion.h1 className="text-5xl md:text-6xl font-black mb-8 leading-[1.05] tracking-tighter">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">Smart Campus <br /> Dining Ecosystem</span>
                        </motion.h1>
                        <p className="text-slate-500 text-base md:text-xl mb-12 max-w-2xl leading-relaxed font-semibold italic">
                            Elevate your campus experience with our cutting-edge ordering ecosystem. Experience the evolution of digital dining with real-time sync and zero wait times.
                        </p>
                        <Link to="/menu" className="btn-modern btn-modern-primary py-5 px-16 rounded-[24px] group shadow-indigo-500/25 text-xl font-black">
                            Launch Menu <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end">
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                            alt="Culinary Brands"
                            className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-[40px] shadow-2xl border-[6px] border-white rotate-3 group-hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                {/* Tertiary Accent Square */}
                <motion.div
                    initial={{ opacity: 0, rotate: -12, x: -100 }}
                    animate={{ opacity: 1, rotate: -6, x: -80 }}
                    className="absolute w-72 h-72 bg-indigo-600/5 border border-indigo-200 rounded-[40px] -z-10"
                />
            </div>

            {/* Feature Section: 4 Columns - Wider spacing to fill 1500px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Staff Portal Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:shadow-emerald-500/10 transition-all duration-500 min-h-[320px]"
                >
                    <div className="h-20 bg-gradient-to-br from-emerald-400 to-teal-500" />
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 border-4 border-white group-hover:rotate-12 transition-transform">
                        <LayoutGrid className="text-emerald-500" size={20} />
                    </div>
                    <div className="pt-8 px-6 pb-6 text-center flex-1 flex flex-col items-center">
                        <h4 className="text-xl font-black text-slate-800 mb-2">Staff Portal</h4>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 italic">Comprehensive management solutions and real-time analytics.</p>
                        <Link to="/login" className="mt-auto w-full py-3 bg-emerald-500 text-white rounded-xl font-black uppercase text-center text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-emerald-500/10">
                            Access Portal
                        </Link>
                    </div>
                </motion.div>

                {/* Zero Wait Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:shadow-indigo-500/10 transition-all duration-500 min-h-[320px]"
                >
                    <div className="h-20 bg-gradient-to-br from-indigo-500 to-violet-600" />
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 border-4 border-white group-hover:rotate-6 transition-transform">
                        <Clock className="text-indigo-600" size={20} />
                    </div>
                    <div className="pt-8 px-6 pb-6 text-center flex-1 flex flex-col items-center">
                        <h4 className="text-xl font-black text-slate-800 mb-2">Zero Wait</h4>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 italic">Skip lines with real-time queueing and notifications.</p>
                        <Link to="/roadmap" className="mt-auto w-full py-3 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all text-center shadow-lg shadow-indigo-500/10">
                            View Roadmap
                        </Link>
                    </div>
                </motion.div>

                {/* Insta-Sync Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:shadow-amber-500/10 transition-all duration-500 min-h-[320px]"
                >
                    <div className="h-20 bg-gradient-to-br from-amber-400 to-orange-500" />
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 border-4 border-white group-hover:-rotate-6 transition-transform">
                        <Zap className="text-amber-500" size={20} />
                    </div>
                    <div className="pt-8 px-6 pb-6 text-center flex-1 flex flex-col items-center">
                        <h4 className="text-xl font-black text-slate-800 mb-2">Insta-Sync</h4>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 italic">Your preferences and orders synced across all devices instantly.</p>
                        <Link to="/orders" className="mt-auto w-full py-3 bg-amber-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all text-center shadow-lg shadow-amber-500/10">
                            Check Status
                        </Link>
                    </div>
                </motion.div>

                {/* Security Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col group hover:shadow-slate-500/10 transition-all duration-500 min-h-[320px]"
                >
                    <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-900" />
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center z-10 border-4 border-white group-hover:scale-110 transition-transform">
                        <ShieldCheck className="text-slate-800" size={20} />
                    </div>
                    <div className="pt-8 px-6 pb-6 text-center flex-1 flex flex-col items-center">
                        <h4 className="text-xl font-black text-slate-800 mb-2">Verified</h4>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 italic">Protected by unique QR-signed verification logic for pickups.</p>
                        <Link to="/security" className="mt-auto w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all text-center shadow-lg shadow-slate-900/10">
                            Verify Security
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
