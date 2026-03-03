import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Rocket, Shield, Zap, X, Send, Sparkles } from 'lucide-react';

const Roadmap = () => {
    const milestones = [
        {
            title: "Phase 1: Digital Core",
            status: "Completed",
            items: ["Real-time Menu Sync", "Secure Student Authentication", "QR-Based Order Verification"],
            icon: <CheckCircle2 className="text-emerald-500" />,
            color: "emerald"
        },
        {
            title: "Phase 2: Smart Operations",
            status: "In Progress",
            items: ["AI-Powered Queue Prediction", "Auto-Inventory Management", "Customizable Dining Profiles"],
            icon: <Clock className="text-indigo-500" />,
            color: "indigo"
        },
        {
            title: "Phase 3: Hyper-Personalization",
            status: "Upcoming",
            items: ["Smart Calorie Tracking", "Preference-Based AI Recommendations", "Multi-Campus Sync"],
            icon: <Circle className="text-slate-300" />,
            color: "slate"
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [idea, setIdea] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/feedback', { email, idea });
            setSubmitted(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitted(false);
                setEmail("");
                setIdea("");
            }, 2500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to beam up the idea');
        }
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                >
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Roadmap</span>
                </motion.h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                    We're evolving the campus dining experience. Here's a look at what we've built and where we're heading next.
                </p>
            </div>

            <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-12 border-l-2 border-slate-100 last:border-0"
                    >
                        <div className="absolute left-[-21px] top-0 w-10 h-10 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center">
                            {milestone.icon}
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-100 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-black text-slate-800">{milestone.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${milestone.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                    milestone.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
                                    }`}>
                                    {milestone.status}
                                </span>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {milestone.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${milestone.color}-400`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="mt-20 p-10 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[32px] text-white overflow-hidden relative"
            >
                <Rocket className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
                <div className="relative z-10 text-center">
                    <h2 className="text-2xl font-black mb-4">Want to suggest a feature?</h2>
                    <p className="text-indigo-200 mb-8 font-medium">We build for students. Your feedback drives our evolution.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-500/10 active:scale-95"
                    >
                        Submit Idea
                    </button>
                </div>
            </motion.div>

            {/* Premium Suggestion Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
                        >
                            <div className="h-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600" />

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors"
                            >
                                <X className="text-slate-400" size={24} />
                            </button>

                            <div className="p-10 md:p-14">
                                {!submitted ? (
                                    <>
                                        <div className="mb-10 text-center">
                                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                                <Rocket className="text-indigo-600" size={32} />
                                            </div>
                                            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Suggest a Feature</h2>
                                            <p className="text-slate-500 font-semibold">Help us innovate the future of campus dining.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Your Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="mandeep@campus.edu"
                                                    className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600/20 transition-all font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Your Brilliant Idea</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={idea}
                                                    onChange={(e) => setIdea(e.target.value)}
                                                    placeholder="Tell us what's missing..."
                                                    className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600/20 transition-all font-semibold resize-none"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-indigo-600 text-white rounded-2xl p-5 font-black uppercase text-sm tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
                                            >
                                                Blast Off <Send size={18} />
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="py-12 text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-100"
                                        >
                                            <Sparkles className="text-emerald-500" size={48} />
                                        </motion.div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Thanks, Pioneer!</h2>
                                        <p className="text-slate-500 font-bold text-lg max-w-sm mx-auto">Your idea has been logged into our systems. We'll review it soon.</p>
                                        <div className="mt-10 flex justify-center gap-2">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="w-2 h-2 rounded-full bg-emerald-400"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                                className="w-2 h-2 rounded-full bg-emerald-300"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                                className="w-2 h-2 rounded-full bg-emerald-200"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Roadmap;
