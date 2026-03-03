import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Search,
    LayoutGrid,
    Utensils,
    Pizza,
    Coffee,
    IceCream,
    Sun,
    ShoppingBag,
    Clock,
    Sparkles
} from 'lucide-react';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();

    const categories = [
        { name: 'All', icon: <LayoutGrid size={32} />, color: 'bg-slate-100', activeColor: 'bg-slate-800', textColor: 'text-slate-600' },
        { name: 'Main Course', icon: <Utensils size={32} />, color: 'bg-indigo-50', activeColor: 'bg-indigo-600', textColor: 'text-indigo-600' },
        { name: 'Snacks', icon: <Pizza size={32} />, color: 'bg-amber-50', activeColor: 'bg-amber-500', textColor: 'text-amber-500' },
        { name: 'Drinks', icon: <Coffee size={32} />, color: 'bg-sky-50', activeColor: 'bg-sky-500', textColor: 'text-sky-500' },
        { name: 'Desserts', icon: <IceCream size={32} />, color: 'bg-rose-50', activeColor: 'bg-rose-500', textColor: 'text-rose-500' },
        { name: 'Breakfast', icon: <Sun size={32} />, color: 'bg-orange-50', activeColor: 'bg-orange-500', textColor: 'text-orange-500' }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                toast.error('Kitchen connection lost');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        (category === 'All' || p.category === category) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`Succesfully added ${product.name}`, {
            style: { borderRadius: '12px', background: '#4f46e5', color: '#fff' }
        });
    };

    return (
        <div className="pt-24 px-10 pb-20 max-w-[1600px] mx-auto space-y-16">
            {/* Search Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div>
                    <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4 shadow-sm">
                        <Sparkles size={14} className="animate-pulse" /> Digital Gastronomy
                    </div>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Campus Inventory</h2>
                    <p className="text-slate-500 font-medium mt-4 text-xl italic">Select a category to explore our curated culinary selection.</p>
                </div>
                <div className="relative w-full lg:w-[400px]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-[24px] py-4 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-slate-800 font-bold text-base shadow-lg"
                    />
                </div>
            </div>

            {/* Massive 3-Column Square Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {categories.map((cat, idx) => (
                    <motion.button
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        key={cat.name}
                        onClick={() => setCategory(cat.name)}
                        className={`card-vibrant flex flex-col items-center justify-center p-10 transition-all duration-500 border-2 shadow-2xl relative overflow-hidden ${category === cat.name
                            ? `bg-white/40 border-indigo-400/30 opacity-50 scale-[0.98]`
                            : `bg-white border-transparent hover:border-slate-200 group`
                            }`}
                    >
                        <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center mb-6 transition-all duration-500 shadow-2xl ${category === cat.name ? `${cat.color} ${cat.textColor} rotate-12` : `${cat.color} ${cat.textColor} group-hover:bg-indigo-50`
                            }`}>
                            {cat.icon}
                        </div>

                        <span className={`text-xl font-black uppercase tracking-tighter text-center leading-none ${category === cat.name ? 'text-indigo-600' : 'text-slate-800'
                            }`}>
                            {cat.name}
                        </span>

                        <p className={`text-[11px] font-black uppercase tracking-[0.3em] mt-5 opacity-60 ${category === cat.name ? 'text-indigo-400' : 'text-slate-400'
                            }`}>
                            {category === cat.name ? 'Active View' : 'Select'}
                        </p>
                    </motion.button>
                ))}
            </div>

            {/* Results Header */}
            <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                <div className="w-2 h-8 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200" />
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
                    Viewing: <span className="text-indigo-600 italic font-medium">{category}</span>
                </h3>
            </div>

            {/* Product List */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(n => <div key={n} className="card-vibrant h-[350px] animate-pulse bg-slate-50" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                layout
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="card-vibrant !p-0 overflow-hidden group border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
                            >
                                <div className="h-60 relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 text-white font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-3 group-hover:translate-y-0 duration-300">
                                        ₹{product.price}
                                    </div>
                                </div>

                                <div className="p-7 flex flex-col flex-1">
                                    <p className="text-[12px] text-indigo-500 font-black uppercase tracking-[0.2em] mb-3">{product.category}</p>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{product.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-1 line-clamp-2 italic">
                                        {product.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{product.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="p-4 bg-indigo-600 text-white rounded-[20px] hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-100 hover:-translate-y-2 active:scale-95"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-40 card-vibrant bg-slate-50/50 border-dashed border-4 border-slate-100">
                    <ShoppingBag className="mx-auto text-slate-200 mb-10" size={100} />
                    <h3 className="text-4xl font-black text-slate-300 tracking-tight">Canteen Restocking</h3>
                    <p className="text-slate-500 font-medium mt-4 text-lg">We are currently updating our digital inventory for this section.</p>
                    <button onClick={() => setCategory('All')} className="btn-modern !bg-indigo-600 text-white px-10 py-5 rounded-full font-black uppercase text-sm mt-12 hover:bg-slate-900 transition-all shadow-xl">Back to All Varieties</button>
                </div>
            )}
        </div>
    );
};

export default Menu;
