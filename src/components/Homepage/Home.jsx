import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../CartContext';
import Cart from '../Cart';

const promotionalBanners = [
  {
    id: 1,
    title: "Fresh Vegetables & Fruits",
    subtitle: "Farm fresh products delivered daily",
    bgColor: "bg-gradient-to-r from-green-500 to-green-400",
    buttonText: "Shop Fresh",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500"
  },
  {
    id: 2,
    title: "Weekly Grocery Bundle",
    subtitle: "Save up to 25% on essential items",
    bgColor: "bg-gradient-to-r from-orange-400 to-orange-300",
    buttonText: "View Bundle",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"
  },
  {
    id: 3,
    title: "Express Delivery",
    subtitle: "Get your groceries in 30 minutes",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-400",
    buttonText: "Order Now",
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500"
  }
];

const allCategories = [
  { id: 1, name: 'Fresh Vegetables', icon: '🥬', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500' },
  { id: 2, name: 'Fresh Fruits', icon: '🍎', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500' },
  { id: 3, name: 'Dairy & Eggs', icon: '🥚', image: 'https://images.unsplash.com/photo-1588710929895-6ee7a0a4d6c3?w=500' },
  { id: 4, name: 'Bread & Bakery', icon: '🍞', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500' },
  { id: 5, name: 'Rice & Pulses', icon: '🌾', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' },
  { id: 6, name: 'Oil & Ghee', icon: '🫗', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500' },
  { id: 7, name: 'Spices', icon: '🧂', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500' },
  { id: 8, name: 'Snacks', icon: '🍿', image: 'https://images.unsplash.com/photo-1621447504864-d8686f12c84a?w=500' },
  { id: 9, name: 'Beverages', icon: '🥤', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb0f96?w=500' },
  { id: 10, name: 'Instant Food', icon: '🥣', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500' }
];

const trendingItems = [
  { 
    id: 1, 
    name: 'Organic Vegetable Pack', 
    price: '₹299', 
    originalPrice: '₹399',
    discount: '25% off', 
    quantity: '5 items',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500' 
  },
  { 
    id: 2, 
    name: 'Premium Rice (5kg)', 
    price: '₹399', 
    originalPrice: '₹459',
    discount: '15% off', 
    quantity: '5 kg pack',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' 
  },
  { 
    id: 3, 
    name: 'Fresh Fruits Combo', 
    price: '₹499', 
    originalPrice: '₹699',
    discount: '30% off', 
    quantity: '8 items',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500' 
  },
  { 
    id: 4, 
    name: 'Daily Essentials Pack', 
    price: '₹899', 
    originalPrice: '₹1199',
    discount: '25% off', 
    quantity: '12 items',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500' 
  }
];

const features = [
  { id: 1, title: 'Express Delivery', description: '30 min delivery', icon: '🚚' },
  { id: 2, title: 'Fresh Products', description: 'Farm fresh items', icon: '🌿' },
  { id: 3, title: 'Best Prices', description: 'Wholesale rates', icon: '💰' },
  { id: 4, title: 'Wide Selection', description: '5000+ products', icon: '🛒' },
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-[80%] mx-auto py-6">
        {/* Main Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[400px] rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 to-green-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div className="relative h-full flex items-center p-12">
            <div className="w-1/2 space-y-6">
              <motion.h1 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-5xl md:text-6xl font-bold text-white leading-tight"
              >
                Fresh Groceries
              </motion.h1>
              <motion.p 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-white/90"
              >
                Get fresh groceries delivered in 30 minutes
              </motion.p>
              <motion.button 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 shadow-lg transition-all"
              >
                Shop Now
              </motion.button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-600/20 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"
                alt="Fresh Groceries"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          {promotionalBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, shadow: "0 12px 30px rgba(0, 0, 0, 0.12)" }}
              className={`${banner.bgColor} rounded-2xl overflow-hidden relative h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}
            >
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{banner.title}</h3>
                  <p className="text-sm text-white/90 font-medium">{banner.subtitle}</p>
                </div>
                <button className="bg-white/90 text-gray-800 px-6 py-2.5 rounded-xl w-fit hover:bg-white transition-colors">
                  {banner.buttonText}
                </button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 z-10" />
                <img src={banner.image} alt={banner.title} className="object-cover h-full w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Items */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Best Deals</h2>
            <button className="text-green-600 font-semibold hover:text-green-700">View All Deals →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  shadow: "0 12px 30px rgba(0, 0, 0, 0.12)"
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)]"
              >
                <div className="relative h-48">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.discount}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.quantity}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-green-600 font-bold mr-2">{item.price}</span>
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
            <button className="text-green-600 font-semibold hover:text-green-700">View All Categories →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  shadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-xl p-4 text-center cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose RapidBite</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">All products are carefully selected and quality checked</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered within 30 minutes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">We offer competitive prices and regular discounts</p>
            </div>
          </div>
        </div>

        {/* Cart Component */}
        <Cart />
      </div>
    </div>
  );
};

export default Home;