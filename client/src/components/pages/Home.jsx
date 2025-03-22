import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import { Link } from "react-router";
import Cart from "../Cart";
import {
  promotionalBanners,
  allCategories,
  trendingItems,
  features,
} from "../constants";
import {
  BannerSkeleton,
  FeatureCardSkeleton,
  CategoryCardSkeleton,
  PromotionalBannerSkeleton,
  ProductCardSkeleton,
} from "../Skeletons";
import { Contrast } from "lucide-react";

const Home = () => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${url}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const products = data.products;
        
        const groupedProducts = products.reduce((acc, product) => {
          const categoryName = product.category;
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push({
            id: product._id,
            name: product.name,
            price: `₹${product.discountPrice}`,
            originalPrice: `₹${product.originalPrice}`,
            discount: `${product.discount}% off`,
            quantity: product.quantity,
            image: product.image,
            inStock: product.inStock
          });
          return acc;
        }, {});
        
        setProducts(groupedProducts);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent mt-15 overflow-hidden">
        <div className="max-w-[95%] sm:max-w-[80%] mx-auto py-4 sm:py-6">
          {/* Main Banner Skeleton */}
          <BannerSkeleton />

          {/* Features Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-8">
            {[1, 2, 3, 4].map((index) => (
              <FeatureCardSkeleton key={index} />
            ))}
          </div>

          {/* Categories Grid Skeleton */}
          <div className="my-8 sm:my-12">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          </div>

          {/* Promotional Banners Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
            {[1, 2, 3].map((index) => (
              <PromotionalBannerSkeleton key={index} />
            ))}
          </div>

          {/* Trending Items Skeleton */}
          <div className="mb-12 sm:mb-16">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
            <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
              {[1, 2, 3, 4, 5].map((index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>

          {/* Categories with Products Skeleton */}
          {[1, 2, 3].map((categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {[1, 2, 3, 4].map((productIndex) => (
                  <ProductCardSkeleton key={productIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent mt-15 overflow-hidden">
      <div className="max-w-[95%] sm:max-w-[80%] mx-auto py-4 sm:py-6">
        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[300px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 to-green-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div className="relative h-full flex items-center p-6 sm:p-12">
            <div className="w-full sm:w-1/2 space-y-4 sm:space-y-6">
              <motion.h1
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              >
                Fresh Groceries
              </motion.h1>
              <motion.p
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-2xl text-white/90 font-poppins"
              >
                Get fresh groceries delivered in 30 minutes
              </motion.p>
              <motion.button
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-opacity-90 shadow-lg transition-all"
              >
                Shop Now
              </motion.button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full hidden sm:block">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base font-poppins">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-poppins">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* All Categories Grid */}
        <div className="my-8 sm:my-12">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Shop By Category
            </h2>
            <button className="text-green-600 text-sm sm:text-base font-semibold hover:text-green-700 font-poppins">
              View All Categories →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {allCategories.map((category) => (
              <Link to={`/items/${category.id}`}>
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{
                    y: -5,
                    shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] cursor-pointer border-2 border-gray-200"
                >
                  <div className="relative h-24 sm:h-32">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="p-3 sm:p-4 text-center">
                    <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">
                      {category.icon}
                    </span>
                    <h3 className="font-medium text-gray-800 text-sm sm:text-base font-poppins">
                      {category.name}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
          {promotionalBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, shadow: "0 12px 30px rgba(0, 0, 0, 0.12)" }}
              className={`${banner.bgColor} rounded-xl sm:rounded-2xl overflow-hidden relative h-[180px] sm:h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}
            >
              <div className="p-6 sm:p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    {banner.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium font-poppins">
                    {banner.subtitle}
                  </p>
                </div>
                <button className="bg-white/90 text-gray-800 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl w-fit hover:bg-white transition-colors text-sm font-poppins">
                  {banner.buttonText}
                </button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 z-10" />
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="object-cover h-full w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Items */}
        <div className="mb-12 sm:mb-16">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Best Deals
            </h2>
            <button className="text-green-600 text-sm sm:text-base font-semibold hover:text-green-700 font-poppins">
              View All Deals →
            </button>
          </div>
          <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                }}
                className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] flex-shrink-0 w-[150px] sm:w-[180px] border-2 border-gray-200"
              >
                <div className="relative h-28 sm:h-32">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    {item.discount}
                  </div>
                </div>
                <div className="p-2 sm:p-3">
                  <h3 className="font-medium text-gray-800 text-xs sm:text-sm truncate font-poppins">
                    {item.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-1 sm:mb-2 font-poppins">
                    {item.quantity}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-green-600 font-bold text-xs sm:text-sm font-poppins">
                        {item.price}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 line-through font-poppins">
                        {item.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs hover:bg-green-700 transition-colors font-poppins"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories with Products */}
        {allCategories.map((category) => (
          <div key={category.name} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h2>
              </div>
              <Link
                to={`/items/${category.name}`}
                className="text-green-600 text-sm font-semibold hover:text-green-700 font-poppins"
              >
                View All →
              </Link>
            </div>

            {products[category.name] ? (
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {products[category.name].map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -5,
                      shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                    }}
                    className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] flex-shrink-0 w-[180px] border-2 border-gray-200"
                  >
                    <div className="relative h-32">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover ${!product.inStock ? 'opacity-50' : ''}`}
                      />
                      {product.discount !== '0% off' && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          {product.discount}
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 text-sm truncate font-poppins">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 font-poppins">
                        {product.quantity}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-green-600 font-bold text-sm font-poppins">
                            {product.price}
                          </span>
                          {product.originalPrice !== product.price && (
                            <span className="text-xs text-gray-500 line-through font-poppins">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.inStock && (
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors font-poppins"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">Coming Soon</p>
              </div>
            )}
          </div>
        ))}

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose RapidBite
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">
                Quality Assured
              </h3>
              <p className="text-gray-600 font-poppins">
                All products are carefully selected and quality checked
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">
                Express Delivery
              </h3>
              <p className="text-gray-600 font-poppins">
                Get your groceries delivered within 30 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">
                Best Prices
              </h3>
              <p className="text-gray-600 font-poppins">
                We offer competitive prices and regular discounts
              </p>
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
