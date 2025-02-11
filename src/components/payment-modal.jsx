import { CreditCard, X } from "lucide-react";

const PaymentModal = ({
    isOpen,
    onClose,
    movieName,
    selectedSeats,
    totalPrice,
}) => {
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
            amount: totalPrice * 100,
            currency: "INR",
            name: "Movie Ticket Booking",
            description: `Booking for ${movieName}`,
            image: "/logo.svg",
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Movie</span>
                            <span>{movieName}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-medium">Selected Seats</span>
                            <span>{selectedSeats.join(", ")}</span>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center font-bold">
                                <span>Total Amount</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                        <CreditCard size={20} />
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
