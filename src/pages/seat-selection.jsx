import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaymentModal from "../components/payment-modal";

const SeatSelection = () => {
    const { id } = useParams();
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    const seatPrices = {
        A: 200,
        B: 200,
        C: 300,
        D: 300,
        E: 400,
        F: 400,
    };

    const priceColors = {
        200: "bg-green-500 hover:bg-green-600",
        300: "bg-blue-500 hover:bg-blue-600",
        400: "bg-purple-500 hover:bg-purple-600",
    };

    const bookedSeats = [];
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [movieName, setMovieName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <>
            <div className="flex flex-col items-center gap-6 md:gap-8 p-4 md:p-8 min-h-screen bg-gray-200 text-black">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">{movieName}</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Showtime: 7:30 PM
                    </p>
                </div>

                <div className="bg-gray-300 p-4 md:p-6 rounded-xl shadow-lg w-full max-w-md md:max-w-2xl">
                    <p className="text-center mb-4 text-gray-800 text-sm md:text-base">
                        Screen This Way ⬆
                    </p>
                    <div className="grid gap-1 md:gap-3">
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
                                            className={`w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-md md:rounded-lg font-medium md:font-semibold text-xs md:text-base
                                            transition-all duration-200 shadow-md text-white
                                            ${isBooked
                                                    ? "bg-gray-600 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-yellow-500 shadow-lg"
                                                        : seatColor
                                                }`}
                                        >
                                            {seat}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-4 lg:bottom-6 lg:right-6 w-full lg:w-[15rem] px-4">
                    <div className="bg-gray-300 p-3 rounded-lg shadow-lg flex flex-col items-center w-full max-w-sm mx-auto lg:mx-0">
                        <p className="text-sm text-center">
                            Selected:{" "}
                            <span className="text-red-700">
                                {selectedSeats.join(", ") || "None"}
                            </span>
                        </p>
                        <p className="text-lg font-bold">
                            Total: ₹{totalPrice.toLocaleString()}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={selectedSeats.length === 0}
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md text-sm w-full disabled:bg-gray-600"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <PaymentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    movieName={movieName}
                    selectedSeats={selectedSeats}
                    totalPrice={totalPrice}
                />
            )}
        </>
    );
};

export default SeatSelection;
