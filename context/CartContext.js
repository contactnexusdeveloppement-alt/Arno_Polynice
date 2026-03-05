'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('arno-cart');
            if (saved) setItems(JSON.parse(saved));
        } catch (e) { /* ignore */ }
    }, []);

    // Save to localStorage on changes
    useEffect(() => {
        localStorage.setItem('arno-cart', JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((product, selectedColor, selectedSize, quantity = 1, variantId = null) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.id === product.id && item.color === selectedColor && item.size === selectedSize
            );
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }
            return [...prev, {
                id: product.id,
                variantId: variantId,
                name: product.name,
                slug: product.slug,
                price: product.price,
                color: selectedColor,
                colorHex: product.colors.find(c => c.name === selectedColor)?.hex,
                size: selectedSize,
                image: product.images[0],
                quantity,
            }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((id, color, size) => {
        setItems(prev => prev.filter(
            item => !(item.id === id && item.color === color && item.size === size)
        ));
    }, []);

    const updateQuantity = useCallback((id, color, size, quantity) => {
        if (quantity <= 0) {
            removeItem(id, color, size);
            return;
        }
        setItems(prev => prev.map(item =>
            item.id === id && item.color === color && item.size === size
                ? { ...item, quantity }
                : item
        ));
    }, [removeItem]);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            setIsOpen,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
