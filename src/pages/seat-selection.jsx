import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Armchair } from "lucide-react";

const SeatSelection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const seatPrices = {
        A: 200,
        B: 200,
        C: 300,
        D: 300,
        E: 400,
        F: 400,
        G: 500,
        H: 500,
    };

    const priceColors = {
        200: "bg-green-500 hover:bg-green-600",
        300: "bg-blue-500 hover:bg-blue-600",
        400: "bg-purple-500 hover:bg-purple-600",
        500: "bg-orange-500 hover:bg-orange-600"
    };

    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [movieName, setMovieName] = useState("");

    useEffect(() => {
        const storedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || {};
        setBookedSeats(storedSeats[id] || []);
    }, [id]);

    const toggleSeatSelection = (seat) => {
        if (bookedSeats.includes(seat)) return;

        const row = seat.charAt(0);
        const seatPrice = seatPrices[row];

        setSelectedSeats((prev) =>
            prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
        );

        setTotalPrice((prev) =>
            selectedSeats.includes(seat) ? prev - seatPrice : prev + seatPrice
        );
    };

    const fetchMovieName = async () => {
        try {
            const response = await axios.get(`/movie/${id}`);
            setMovieName(response.data.title);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovieName();
    }, []);

    const handleAddToCart = () => {
        if (selectedSeats.length === 0) return;

        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        const newCartItem = {
            id: id,
            movieName,
            selectedSeats,
            totalPrice,
        };

        cartItems.push(newCartItem);

        localStorage.setItem("cart", JSON.stringify(cartItems));

        const storedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || {};
        const updatedBookedSeats = [...(storedSeats[id] || []), ...selectedSeats];

        storedSeats[id] = updatedBookedSeats;
        localStorage.setItem("bookedSeats", JSON.stringify(storedSeats));

        navigate("/cart");
    };


    return (
        <div className="flex flex-col items-center gap-6 md:gap-8 p-4 md:p-8 min-h-screen bg-gray-200 text-black">
            <div className="text-center">
                <h2 className="text-xl md:text-3xl font-bold">{movieName}</h2>
                <p className="text-gray-600 text-sm md:text-base">
                    Showtime: 7:30 PM
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 w-full">
                <div className="bg-gray-300 p-4 md:p-6 rounded-xl shadow-lg w-full lg:w-3/4">
                    <p className="text-center mb-4 text-gray-800 text-sm md:text-base">
                        Screen This Way ⬆
                    </p>
                    <div className="grid gap-2 md:gap-4">
                        {rows.map((row) => (
                            <div key={row} className="flex gap-1 md:gap-3 justify-center">
                                {cols.map((col) => {
                                    const seat = `${row}${col}`;
                                    const isBooked = bookedSeats.includes(seat);
                                    const isSelected = selectedSeats.includes(seat);
                                    const seatPrice = seatPrices[row];
                                    const seatColor = priceColors[seatPrice];

                                    return (
                                        <button
                                            key={seat}
                                            onClick={() => toggleSeatSelection(seat)}
                                            disabled={isBooked}
                                            className={`w-5 h-5 sm:h-8 sm:w-8 md:w-10 md:h-10 flex items-center justify-center rounded-md md:rounded-lg 
                                            transition-all duration-200 shadow-md text-white
                                            ${isBooked ? "bg-gray-600 cursor-not-allowed" : isSelected ? "bg-yellow-500 shadow-lg" : seatColor}`}
                                        >
                                            <Armchair size={16} className={isBooked ? "text-gray-400" : "text-white"} />
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-300 p-4 md:p-6 rounded-xl shadow-lg w-full lg:w-1/4 space-y-4 text-center">
                    <p className="text-sm">
                        Selected:{" "}
                        <span className="text-red-700">
                            {selectedSeats.join(", ") || "None"}
                        </span>
                    </p>
                    <p className="text-lg font-bold">
                        Total: ₹{totalPrice.toLocaleString()}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        disabled={selectedSeats.length === 0}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md text-sm w-full disabled:bg-gray-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
