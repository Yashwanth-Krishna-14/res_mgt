import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, addToCart, removeFromCart, clearCart }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleClearCart = () => {
        clearCart();
        setShowConfirmation(false);
    };

    // Function to calculate subtotal
    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.count, 0);
    };

    // Function to calculate GST (10% for example)
    const calculateGST = (subtotal) => {
        return (subtotal * 0.10).toFixed(2); // 10% GST
    };

    // Function to calculate discount
    const calculateDiscount = (subtotal) => {
        const discountThreshold = 100; // Set your threshold
        const discountPercentage = 0.10; // 10% discount
        return subtotal > discountThreshold ? (subtotal * discountPercentage).toFixed(2) : 0;
    };

    const subtotal = getSubtotal();
    const gst = calculateGST(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = (subtotal + parseFloat(gst) - parseFloat(discount)).toFixed(2);

    return (
        <div className="flex flex-col md:flex-row p-6 bg-black-300 min-h-screen">
            {/* Sidebar for Cart Items */}
            <div className="flex-grow md:w-2/3 p-4 bg-black-300 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6 text-center text-orange-600">Your Cart</h1>
                {cart.length === 0 ? (
                    <div className="text-gray-700 text-center">
                        <p className="text-lg">Your cart is empty.</p>
                        <button 
                            onClick={() => navigate('/menu')}
                            className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-500 transition duration-300"
                        >
                            Explore Full Menu
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cart.map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105"
                            >
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-32 object-cover rounded-md mb-2" 
                                />
                                <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => addToCart(item)}
                                            aria-label={`Add one more ${item.name}`}
                                            className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-green-400"
                                        >
                                            <FaPlus size={16} />
                                        </button>
                                        <span className="mx-2 text-lg font-bold">{item.count}</span>
                                        {item.count > 0 && (
                                            <button
                                                onClick={() => removeFromCart(item)}
                                                aria-label={`Remove one ${item.name}`}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-red-400"
                                            >
                                                <FaMinus size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Summary Section */}
            <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg md:ml-4 mt-4 md:mt-0">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                <div className="flex justify-between mt-2">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium">GST (10%):</span>
                    <span className="font-bold">${gst}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium">Discount:</span>
                    <span className="font-bold">-${discount}</span>
                </div>
                <div className="flex justify-between mt-2 border-t pt-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${total}</span>
                </div>

                {/* Clear Cart Button with Confirmation */}
                <button 
                    onClick={() => setShowConfirmation(true)}
                    aria-label="Clear all items from cart"
                    className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition duration=300 block mx-auto flex items-center justify-center"
                >
                    <FaTrash className="mr-2" size={20} />
                    Clear Cart
                </button>

                {/* Confirmation Dialog */}
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-semibold mb-4">Are you sure you want to clear your cart?</h3>
                            <div className="flex justify-between">
                                <button 
                                    onClick={handleClearCart} 
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration=300"
                                >
                                    Yes, Clear
                                </button>
                                <button 
                                    onClick={() => setShowConfirmation(false)} 
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration=300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;