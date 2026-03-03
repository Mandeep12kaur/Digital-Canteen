import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, LogOut, LayoutDashboard, User, UtensilsCrossed, Settings, Compass, Clock } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="premium-nav">
            <Link to="/" className="brand-logo">
                <div className="logo-symbol">
                    <UtensilsCrossed size={24} />
                </div>
                <span className="logo-text">Campus<span className="logo-dot">Crave</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
                <Link to="/menu" className={`flex items-center gap-2 text-sm font-bold transition-all ${isActive('/menu') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
                    <Compass size={18} /> Explore Menu
                </Link>
                {user?.role === 'admin' && (
                    <Link to="/admin" className={`flex items-center gap-2 text-sm font-bold transition-all ${isActive('/admin') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
                        <LayoutDashboard size={18} /> Staff Panel
                    </Link>
                )}
            </div>

            <div className="flex items-center gap-6">
                <Link to="/cart" className="relative p-3 bg-slate-50 rounded-2xl text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                    <ShoppingBag size={22} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-[10px] text-white w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-white">
                            {cartItems.length}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                        <div className="group relative">
                            <button className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-slate-200">
                                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-xs font-black uppercase tracking-widest text-text-muted leading-none mb-1">Account</p>
                                    <p className="text-sm font-bold text-secondary flex items-center gap-1">{user.name.split(' ')[0]} <ChevronDown size={12} /></p>
                                </div>
                            </button>

                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                                <div className="px-5 py-2 mb-2">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Signed in as</p>
                                    <p className="text-sm font-bold text-secondary truncate">{user.email}</p>
                                </div>
                                <div className="h-px bg-slate-100 my-2" />
                                <Link to="/orders" className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <Clock size={18} className="text-indigo-500" /> Order History
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-danger hover:bg-red-50 transition-colors">
                                    <LogOut size={18} /> Sign Out securely
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="btn-modern btn-modern-primary px-8">
                        Get Started
                    </Link>
                )}
            </div>
        </nav>
    );
};

// Simple Chevron helper for the navbar
const ChevronDown = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default Navbar;
