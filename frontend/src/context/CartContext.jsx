import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existItem = prev.find((x) => x._id === product._id);
            if (existItem) {
                return prev.map((x) => (x._id === product._id ? { ...x, qty: x.qty + 1 } : x));
            } else {
                return [...prev, { ...product, qty: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((x) => x._id !== id));
    };

    const updateQty = (id, qty) => {
        setCartItems((prev) =>
            prev.map((x) => (x._id === id ? { ...x, qty: parseInt(qty) } : x))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
