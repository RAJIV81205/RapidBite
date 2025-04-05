import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router";
import { load } from "@cashfreepayments/cashfree-js";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [pincodeError, setPincodeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    pincode: "",
    city: "",
    state: "",
    paymentMethod: "cod",
  });
  const [order_id, setOrder_ID] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL;


  const getOrderStatus = async () => {
    const response = await fetch(`${url}/payment/get-order-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        order_id: order_id,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.order_status === "PAID") {
      // Handle successful payment here 
      const orderResponse = await fetch(`${url}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total.toFixed(2),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          mobile: formData.phone,
          paymentMethod: "upi",
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
      // Clear cart and redirect to profile
      clearCart();
      navigate(`/track/${orderData.newOrder._id}`);
    } else {
      // Handle payment failure here
      alert("Payment failed. Please try again.");
      console.log("Payment failed:", data);
    }

  };
  


  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };
  initializeSDK();


  const doPayment = async (sessionID) => {
        
    let checkoutOptions = {
      paymentSessionId: sessionID,
      redirectTarget: "_modal",
    };
    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log(
          "User has closed the popup or there is some payment error, Check for Payment Status"
        );
        console.log(result.error);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result.paymentDetails.paymentMessage);
        getOrderStatus()
    };
  });
}

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${url}/verify-token`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/auth");
          return;
        }

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          name: data.user.name || "",
          phone: data.user.mobile || "",
          address: data.user.address || "",
          email: data.user.email || "",
          pincode: data.user.pincode || "",
          city: data.user.city || "",
          state: data.user.state || "",
        }));

        // If pincode exists, validate it
        if (data.user.pincode) {
          validatePincode(data.user.pincode);
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const validatePincode = async (pincode) => {
    setIsPincodeLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        setPincodeError("");
        const postOffices = data[0].PostOffice;
        setCityOptions(postOffices);

        // Set the first city and state if available
        if (postOffices.length > 0) {
          setFormData((prev) => ({
            ...prev,
            state: postOffices[0].State,
          }));
        }
      } else {
        setPincodeError("Invalid pincode");
        setCityOptions([]);
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } catch (error) {
      console.error("Error validating pincode:", error);
      setPincodeError("Error validating pincode");
      setCityOptions([]);
    } finally {
      setIsPincodeLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate pincode when it's changed
    if (name === "pincode" && value.length === 6) {
      await validatePincode(value);
    }
  };

  const subtotal = getCartTotal();
  const discount = subtotal * 0.1;
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const deliveryCharge = subtotal < 250 ? 40 : 0;
  const paymentGatewayCharge = formData.paymentMethod === "upi" ? (subtotal - discount) * 0.02 : 0;
  const total = subtotal + cgst + sgst + deliveryCharge - discount + paymentGatewayCharge;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_BACKEND_URL;

      if (formData.paymentMethod === "cod") {
        // Handle COD payment
        const orderResponse = await fetch(`${url}/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems,
            totalAmount: total.toFixed(2),
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            mobile: formData.phone,
            paymentMethod: "cod",
          }),
        });
        const data = await orderResponse.json();

        if (!orderResponse.ok) {
          throw new Error("Failed to create order");
        }

        // Clear cart and redirect to profile
        clearCart();
        navigate(`/track/${data.newOrder._id}`);
      } else {
        // Handle UPI payment
        const paymentResponse = await fetch(
          `${url}/payment/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              amount: total.toFixed(2),
              customer_name: formData.name,
              customer_phone: formData.phone,
              customer_email: formData.email,
            }),
          }
        );

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
          throw new Error("Failed to create payment session");
        }

        console.log(paymentData);
        setOrder_ID(paymentData.order_id);
        const sessionID = paymentData.payment_session_id;
        doPayment(sessionID);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-poppins mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold">
                        ₹
                        {(() => {
                          const price =
                            typeof item.price === "string"
                              ? parseFloat(item.price.replace(/[₹,]/g, ""))
                              : item.price;
                          return (price || 0) * (item.quantity || 1);
                        })()}
                      </span>
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Cost Breakdown & Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Cost Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Cost Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (10%)</span>
                  <span className="text-red-600">
                    {" "}
                    - ₹{discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>CGST (9%)</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>SGST (9%)</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
                {deliveryCharge === 0 ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span>₹{deliveryCharge.toFixed(2)}</span>
                  </div>
                )}
                {formData.paymentMethod === "upi" && (
                  <div className="flex justify-between text-gray-600">
                    <span>Payment Gateway Charges (2%)</span>
                    <span>₹{paymentGatewayCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="block w-full px-4 py-3 text-black bg-transparent border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-green-500 peer"
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder=" "
                    className="block w-full px-4 py-3 text-black bg-transparent border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-green-500 peer"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="block w-full px-4 py-3 text-black bg-transparent border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-green-500 peer"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                  >
                    Email
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        placeholder=" "
                        className={`block w-full px-4 py-3 text-black bg-transparent border-2 ${
                          pincodeError ? "border-red-500" : "border-gray-200"
                        } rounded-lg appearance-none focus:outline-none focus:border-green-500 peer pr-10`}
                      />
                      {isPincodeLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-transparent"></div>
                        </div>
                      )}
                      <label
                        htmlFor="pincode"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                      >
                        Pincode
                      </label>
                      {pincodeError && (
                        <p className="mt-1 text-xs text-red-500">
                          {pincodeError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 text-black bg-transparent border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-green-500"
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((po, index) => (
                        <option key={index} value={po.Name}>
                          {po.Name}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="city"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                    >
                      City
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    disabled
                    placeholder=" "
                    className="block w-full px-4 py-3 text-black bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none peer cursor-not-allowed opacity-75"
                  />
                  <label
                    htmlFor="state"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    State
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-black bg-transparent border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-green-500 peer"
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 peer-focus:text-green-500"
                  >
                    Delivery Address
                  </label>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor="cod"
                        className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50"
                      >
                        <div className="text-center">
                          <span className="block font-medium">
                            Cash on Delivery
                          </span>
                          <span className="text-sm text-gray-500">
                            Pay when you receive
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor="upi"
                        className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-50"
                      >
                        <div className="text-center">
                          <span className="block font-medium">UPI Payment</span>
                          <span className="text-sm text-gray-500">
                            Pay instantly
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold mt-6 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      {formData.paymentMethod === "cod"
                        ? "Creating Order..."
                        : "Processing Payment..."}
                    </div>
                  ) : formData.paymentMethod === "cod" ? (
                    "Place Order"
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
