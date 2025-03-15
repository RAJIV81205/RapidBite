import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import Cart from "../Cart";

const promotionalBanners = [
  {
    id: 1,
    title: "Fresh Vegetables & Fruits",
    subtitle: "Farm fresh products delivered daily",
    bgColor: "bg-gradient-to-r from-green-500 to-green-400",
    buttonText: "Shop Fresh",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
  },
  {
    id: 2,
    title: "Weekly Grocery Bundle",
    subtitle: "Save up to 25% on essential items",
    bgColor: "bg-gradient-to-r from-orange-400 to-orange-300",
    buttonText: "View Bundle",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
  },
  {
    id: 3,
    title: "Express Delivery",
    subtitle: "Get your groceries in 30 minutes",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-400",
    buttonText: "Order Now",
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500",
  },
];

const allCategories = [
  {
    id: 1,
    name: "Fresh Vegetables",
    icon: "🥬",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
  },
  {
    id: 2,
    name: "Fresh Fruits",
    icon: "🍎",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
  },
  {
    id: 3,
    name: "Dairy & Eggs",
    icon: "🥚",
    image:
      "https://s.yimg.com/ny/api/res/1.2/qmO96mSmXT5F_4CtH05Wjg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTc-/https://media.zenfs.com/en/tasting_table_543/e55fbbbabab864c9a7da176df7f0958a",
  },
  {
    id: 4,
    name: "Bread & Bakery",
    icon: "🍞",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
  },
  {
    id: 5,
    name: "Rice & Pulses",
    icon: "🌾",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlU-Ae12xz3ZjQrD2RvXHK55IAaCacQJnVQ&s",
  },
  {
    id: 6,
    name: "Oil & Ghee",
    icon: "🫗",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpAk9TyAm9U3_Nc8Fmwh9vH0uf0vrJo7hJFwV2cJgVEIghoQgY1JzN4K7IUovTWpM-Xu4&usqp=CAU",
  },
  {
    id: 7,
    name: "Spices",
    icon: "🧂",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",
  },
  {
    id: 8,
    name: "Snacks",
    icon: "🍿",
    image:
      "https://i.etsystatic.com/29356732/r/il/34dc4c/5159352621/il_fullxfull.5159352621_guwf.jpg",
  },
  {
    id: 9,
    name: "Beverages",
    icon: "🥤",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGtkoq9V7ETfgOoA7ocitS9apGg1a0ukHlSg&s",
  },
  {
    id: 10,
    name: "Instant Food",
    icon: "🥣",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2024/12/TT-INSTANT-NOODLES-2048px-5957-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp",
  },
  {
    id: 11,
    name: "Sexual Wellness",
    icon: "🥣",
    image:
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iauIvy8Ma974/v1/1200x800.jpg",
  },
  {
    id: 12,
    name: "Stationary",
    icon: "🥣",
    image:
      "https://5.imimg.com/data5/XI/PZ/CQ/SELLER-89977312/stationary-goods-500x500.jpeg",
  },
];

const trendingItems = [
  {
    id: 1,
    name: "Organic Vegetable Pack",
    price: "₹299",
    originalPrice: "₹399",
    discount: "25% off",
    quantity: "5 items",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
  },
  {
    id: 2,
    name: "Premium Rice (5kg)",
    price: "₹399",
    originalPrice: "₹459",
    discount: "15% off",
    quantity: "5 kg pack",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
  },
  {
    id: 3,
    name: "Fresh Fruits Combo",
    price: "₹499",
    originalPrice: "₹699",
    discount: "30% off",
    quantity: "8 items",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
  },
  {
    id: 4,
    name: "Daily Essentials Pack",
    price: "₹899",
    originalPrice: "₹1199",
    discount: "25% off",
    quantity: "12 items",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
  },
];

const features = [
  {
    id: 1,
    title: "Express Delivery",
    description: "30 min delivery",
    icon: "🚚",
  },
  {
    id: 2,
    title: "Fresh Products",
    description: "Farm fresh items",
    icon: "🌿",
  },
  { id: 3, title: "Best Prices", description: "Wholesale rates", icon: "💰" },
  { id: 4, title: "Wide Selection", description: "5000+ products", icon: "🛒" },
];

const categoryProducts = {
  "Fresh Vegetables": [
    {
      id: "v1",
      name: "Organic Tomatoes",
      price: "₹40",
      originalPrice: "₹50",
      discount: "20% off",
      quantity: "500g",
      image: "https://images.unsplash.com/photo-1546750670-50d46ba73a0d?w=500",
    },
    {
      id: "v2",
      name: "Fresh Spinach",
      price: "₹30",
      originalPrice: "₹35",
      discount: "15% off",
      quantity: "250g",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500",
    },
    {
      id: "v3",
      name: "Green Bell Peppers",
      price: "₹60",
      originalPrice: "₹75",
      discount: "20% off",
      quantity: "500g",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500",
    },
    {
      id: "v4",
      name: "Carrots",
      price: "₹35",
      originalPrice: "₹45",
      discount: "22% off",
      quantity: "500g",
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500",
    },
  ],
  "Fresh Fruits": [
    {
      id: "f1",
      name: "Red Apples",
      price: "₹120",
      originalPrice: "₹150",
      discount: "20% off",
      quantity: "1kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    },
    {
      id: "f2",
      name: "Bananas",
      price: "₹40",
      originalPrice: "₹50",
      discount: "20% off",
      quantity: "6 pcs",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500",
    },
    {
      id: "f3",
      name: "Sweet Oranges",
      price: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
      quantity: "4 pcs",
      image:
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500",
    },
    {
      id: "f4",
      name: "Mangoes",
      price: "₹200",
      originalPrice: "₹250",
      discount: "20% off",
      quantity: "1kg",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500",
    },
  ],
  "Dairy & Eggs": [
    {
      id: "d1",
      name: "Fresh Milk",
      price: "₹60",
      originalPrice: "₹70",
      discount: "15% off",
      quantity: "1L",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",
    },
    {
      id: "d2",
      name: "Farm Eggs",
      price: "₹90",
      originalPrice: "₹110",
      discount: "18% off",
      quantity: "12 pcs",
      image:
        "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500",
    },
    {
      id: "d3",
      name: "Butter",
      price: "₹50",
      originalPrice: "₹65",
      discount: "23% off",
      quantity: "100g",
      image:
        "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500",
    },
    {
      id: "d4",
      name: "Cheese Slices",
      price: "₹120",
      originalPrice: "₹140",
      discount: "14% off",
      quantity: "200g",
      image:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500",
    },
  ],
  "Bread & Bakery": [
    {
      id: "b1",
      name: "Whole Wheat Bread",
      price: "₹40",
      originalPrice: "₹50",
      discount: "20% off",
      quantity: "400g",
      image:
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500",
    },
    {
      id: "b2",
      name: "Croissants",
      price: "₹60",
      originalPrice: "₹75",
      discount: "20% off",
      quantity: "2 pcs",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500",
    },
    {
      id: "b3",
      name: "Muffins",
      price: "₹80",
      originalPrice: "₹95",
      discount: "16% off",
      quantity: "4 pcs",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
    },
    {
      id: "b4",
      name: "Burger Buns",
      price: "₹30",
      originalPrice: "₹40",
      discount: "25% off",
      quantity: "4 pcs",
      image:
        "https://images.unsplash.com/photo-1587075417738-aa7e95cd7d8b?w=500",
    },
  ],
  "Rice & Pulses": [
    {
      id: "r1",
      name: "Basmati Rice",
      price: "₹180",
      originalPrice: "₹220",
      discount: "18% off",
      quantity: "1kg",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    },
    {
      id: "r2",
      name: "Yellow Dal",
      price: "₹120",
      originalPrice: "₹150",
      discount: "20% off",
      quantity: "500g",
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
    },
    {
      id: "r3",
      name: "Black Chickpeas",
      price: "₹90",
      originalPrice: "₹110",
      discount: "18% off",
      quantity: "500g",
      image:
        "https://images.unsplash.com/photo-1515543904379-3d757afe72a4?w=500",
    },
    {
      id: "r4",
      name: "Brown Rice",
      price: "₹150",
      originalPrice: "₹180",
      discount: "17% off",
      quantity: "1kg",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    },
  ],
  Snacks: [
    {
      id: "s1",
      name: "Potato Chips",
      price: "₹20",
      originalPrice: "₹25",
      discount: "20% off",
      quantity: "100g",
      image:
        "https://images.unsplash.com/photo-1621447504864-d8686f12c84a?w=500",
    },
    {
      id: "s2",
      name: "Mixed Nuts",
      price: "₹180",
      originalPrice: "₹220",
      discount: "18% off",
      quantity: "200g",
      image:
        "https://images.unsplash.com/photo-1536591375315-2a5b3f7a7d9a?w=500",
    },
    {
      id: "s3",
      name: "Popcorn",
      price: "₹40",
      originalPrice: "₹50",
      discount: "20% off",
      quantity: "150g",
      image:
        "https://images.unsplash.com/photo-1578849278002-014fa7c91ec7?w=500",
    },
    {
      id: "s4",
      name: "Cookies",
      price: "₹30",
      originalPrice: "₹40",
      discount: "25% off",
      quantity: "100g",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
    },
  ],
  Beverages: [
    {
      id: "bv1",
      name: "Orange Juice",
      price: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
      quantity: "1L",
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500",
    },
    {
      id: "bv2",
      name: "Cola",
      price: "₹40",
      originalPrice: "₹45",
      discount: "11% off",
      quantity: "500ml",
      image:
        "https://images.unsplash.com/photo-1527960471264-932f39eb0f96?w=500",
    },
    {
      id: "bv3",
      name: "Green Tea",
      price: "₹150",
      originalPrice: "₹180",
      discount: "17% off",
      quantity: "25 bags",
      image:
        "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500",
    },
    {
      id: "bv4",
      name: "Mineral Water",
      price: "₹20",
      originalPrice: "₹25",
      discount: "20% off",
      quantity: "1L",
      image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=500",
    },
  ],
};

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

        {/* All Categories Grid */}
        <div className="my-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Shop By Category
            </h2>
            <button className="text-green-600 font-semibold hover:text-green-700">
              View All Categories →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{
                  y: -5,
                  shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                }}
                className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] cursor-pointer"
              >
                <div className="relative h-32">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-4 text-center">
                  <span className="text-2xl mb-2 block">{category.icon}</span>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
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
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {banner.title}
                  </h3>
                  <p className="text-sm text-white/90 font-medium">
                    {banner.subtitle}
                  </p>
                </div>
                <button className="bg-white/90 text-gray-800 px-6 py-2.5 rounded-xl w-fit hover:bg-white transition-colors">
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
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Best Deals</h2>
            <button className="text-green-600 font-semibold hover:text-green-700">
              View All Deals →
            </button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
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
                className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] flex-shrink-0 w-[180px]"
              >
                <div className="relative h-32">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    {item.discount}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{item.quantity}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-green-600 font-bold text-sm">
                        {item.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {item.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
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
          <div key={category.id} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h2>
              </div>
              <button className="text-green-600 text-sm font-semibold hover:text-green-700">
                View All →
              </button>
            </div>

            {categoryProducts[category.name] ? (
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {categoryProducts[category.name].map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -5,
                      shadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                    }}
                    className="bg-white rounded-xl overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.07)] flex-shrink-0 w-[180px]"
                  >
                    <div className="relative h-32">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {product.discount}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {product.quantity}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-green-600 font-bold text-sm">
                            {product.price}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          Add to Cart
                        </button>
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
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products are carefully selected and quality checked
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
              <p className="text-gray-600">
                Get your groceries delivered within 30 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
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
