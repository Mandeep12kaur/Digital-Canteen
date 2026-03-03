import { motion } from 'framer-motion';
import { ShieldCheck, Lock, QrCode, Fingerprint, EyeOff, Server } from 'lucide-react';

const Security = () => {
    const features = [
        {
            title: "QR-Signed Verification",
            description: "Every order generates a unique, cryptographically signed QR code that only you possess, ensuring safe and correct pickups.",
            icon: <QrCode size={24} className="text-indigo-600" />
        },
        {
            title: "End-to-End Encryption",
            description: "All communication between your device and our servers is secured using industry-standard TLS 1.3 encryption.",
            icon: <Lock size={24} className="text-amber-500" />
        },
        {
            title: "Identity Protection",
            description: "We use secure hashing algorithms to store your credentials, ensuring your campus identity remains private and protected.",
            icon: <Fingerprint size={24} className="text-emerald-500" />
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl mb-8 border border-emerald-100 shadow-xl shadow-emerald-500/10"
                >
                    <ShieldCheck size={40} />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                >
                    Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Trust</span>
                </motion.h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    Security isn't an afterthought. It's the foundation of CampusCrave. We use enterprise-grade protocols to keep your dining experience secure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-indigo-500/5 transition-all group"
                    >
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-4">{feature.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Server className="text-emerald-400" size={24} />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Zero Trust Architecture</span>
                        </div>
                        <h2 className="text-3xl font-black mb-6 leading-tight">Your data, <br /> doubly protected.</h2>
                        <p className="text-slate-400 font-medium mb-8">
                            We implement strict access controls and real-time monitoring to prevent unauthorized access at every level of our stack.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-300">ISO 27001 Compliant</div>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-300">AES-256 Storage</div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="relative w-48 h-48 border-2 border-white/10 rounded-full flex items-center justify-center"
                        >
                            <div className="w-40 h-40 border-2 border-emerald-500/20 rounded-full animate-pulse" />
                            <ShieldCheck className="absolute text-emerald-500" size={48} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
