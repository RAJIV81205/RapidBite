import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const addToCart = (item) => {
    // Log the item to debug
    console.log('Adding item to cart:', item);

    // Check if item exists and has required properties
    if (!item || !item._id) {
      console.error('Invalid item added to cart:', item);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      // Create a new cart item with the correct structure
      return [...prevItems, { 
        _id: item._id,
        name: item.name,
        image: item.image,
        quantity: 1,
        price: item.discountPrice,
        originalPrice: item.originalPrice,
        weight: item.weight,
        volume: item.volume
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item || !item.price) return total;
      try {
        // Handle both string and number price formats
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[₹,]/g, ''))
          : item.price;
        return total + (isNaN(price) ? 0 : price * (item.quantity || 1));
      } catch (error) {
        console.error('Error calculating price for item:', item);
        return total;
      }
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const value = {
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 