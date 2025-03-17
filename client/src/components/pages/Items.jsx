import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useCart } from "../CartContext";
import Cart from "../Cart";
import { categoryProducts, allCategories } from "../constants";

const Items = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();
  const products = categoryProducts[categoryId] || [];
  const category = allCategories.find(cat => cat.id.toString() === categoryId);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-[80%] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category?.icon}</span>
            <h1 className="text-3xl font-bold text-gray-800">{category?.name}</h1>
          </div>
          <p className="text-gray-600">{products.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -5,
                shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
              }}
              className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)]"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {product.discount}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 text-lg mb-1 font-poppins">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 font-poppins">
                  {product.quantity}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-green-600 font-bold text-lg font-poppins">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through font-poppins">
                      {product.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors font-poppins"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products available in this category yet.</p>
            </div>
          )}
        </div>

        {/* Cart Component */}
        <Cart />
      </div>
    </div>
  );
};

export default Items;
