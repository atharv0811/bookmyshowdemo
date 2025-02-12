import { Home, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const loadScript = (src) => {
        return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const handlePayment = async () => {
        const response = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!response) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const razorpayOptions = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
            amount: (totalAmount + 50) * 100,
            currency: "INR",
            name: "Movie Ticket Booking",
            description: `Booking for movie`,
            image: "/logo.svg",
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

                localStorage.removeItem("cart");
                setCartItems([]);

                navigate("/");
            },
            prefill: {
                name: "User",
                email: "user@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#ff3f6c",
            },
        }

        const paymentObject = new window.Razorpay(razorpayOptions);
        paymentObject.open();
    }

    return (
        <div className="max-w-[1180px] mx-auto p-6 lg:px-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

            {
                cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{item.movieName}</h3>
                                            <div className="mt-4">
                                                <p className="text-sm font-semibold text-gray-700">Selected Seats:</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {item.selectedSeats.map((seat) => (
                                                        <span key={seat} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                                                            {seat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 className="h-5 w-5" onClick={() => handleRemoveItem(item.id)} />
                                        </button>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex justify-end items-center">
                                            <p className="text-lg font-bold text-gray-800">
                                                ₹{item.totalPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Convenience Fee</span>
                                        <span>₹50</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>₹{totalAmount + 50}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handlePayment} className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-indigo-700 transition-colors">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="bg-gray-100 rounded-full p-6 mb-6">
                            <ShoppingCart className="w-12 h-12 text-gray-400" />
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md">
                            Looks like you haven't added anything to your cart yet. Start exploring movies.
                        </p>

                        <button onClick={() => navigate('/')} className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                            <Home className="w-5 h-5 mr-2" />
                            Go to Home
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Cart