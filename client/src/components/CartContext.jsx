import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or empty array if no data exists
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add isCartOpen state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item) => {
    // Check if item exists and has required properties
    if (!item || !item.id) {
      console.error('Invalid item added to cart:', item);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      // Create a new cart item with the correct structure
      return [...prevItems, { 
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: 1,
        price: item.price,
        originalPrice: item.originalPrice,
        weight: item.weight,
        volume: item.volume
      }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cart");
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      if (!item || !item.price) return total;
      try {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[₹,]/g, ''))
          : parseFloat(item.price);
        return total + (isNaN(price) ? 0 : price * (item.quantity || 1));
      } catch (error) {
        console.error('Error calculating price for item:', item);
        return total;
      }
    }, 0);
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cartItems]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart,
    setIsCartOpen
  }), [
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart,
    setIsCartOpen
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 