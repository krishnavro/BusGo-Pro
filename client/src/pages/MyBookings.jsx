
import { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch My Bookings
    const getMyBookings = async () => {
        try {

            setLoading(true);

            const response = await api.get(
                "/booking/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setBookings(response.data.bookings || []);

        } catch (error) {
            console.log(error);
            setBookings([]);

        } finally {
            setLoading(false);
        }
    };

    // Cancel Booking
    const cancelBooking = async (id) => {

        try {

            const response = await api.put(
                `/booking/cancel/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert(response.data.message);

            getMyBookings();

        } catch (error) {

            if (error.response?.status === 401) {
                return;
            }

            alert(error.response?.data?.message || "Cancel Failed");
        }
    };

    useEffect(() => {
        getMyBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">

            <div className="max-w-6xl mx-auto">

                {/* Page Heading */}
                <div className="mb-8">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        My Bookings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage all your bus bookings.
                    </p>

                </div>

                {/* Loading */}
                {loading && (

                    <div className="text-center py-20">

                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>

                        <p className="text-gray-600 font-medium">
                            Loading your bookings...
                        </p>

                    </div>

                )}

                {/* No Bookings */}
                {!loading && bookings.length === 0 && (

                    <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12 text-center shadow-sm">

                        <div className="text-5xl mb-4">
                            🚌
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                            No Bookings Yet
                        </h2>

                        <p className="text-gray-500">
                            You haven't booked any buses yet.
                        </p>

                    </div>

                )}

                {/* Booking Cards */}
                {!loading && bookings.length > 0 && (

                    <div className="grid grid-cols-1 gap-5">

                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
                            >

                                <div className="p-4 sm:p-6">

                                    {/* Bus Details */}
                                    <div className="flex items-center gap-3 mb-5">

                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-50 flex items-center justify-center text-3xl shrink-0">
                                            🚌
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="font-bold text-base sm:text-lg text-gray-900">
                                                {booking.busId?.busName || "Bus Unavailable"}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {booking.busId?.busType}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                {booking.busId?.busNumber}
                                            </p>
                                        </div>

                                        <div className="ml-auto shrink-0">
                                            <span className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full ${
                                                booking.bookingStatus === "Booked"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                            }`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Journey Details */}
                                    <div className="flex items-center justify-between gap-2">

                                        <div className="min-w-0">
                                            <p className="text-sm sm:text-lg font-bold text-gray-900 truncate">
                                                {booking.busId?.departureTime || "--"}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                                {booking.busId?.from || "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex-1 min-w-0 text-center px-1 sm:px-3">

                                            <div className="flex items-center gap-1">
                                                <div className="h-px bg-gray-300 flex-1"></div>
                                                <span className="text-red-600">🚌</span>
                                                <div className="h-px bg-gray-300 flex-1"></div>
                                            </div>

                                            <p className="text-xs text-gray-400 mt-2">
                                                {booking.busId?.runsDaily
                                                    ? "Daily"
                                                    : booking.busId?.journeyDate?.split("T")[0] || "N/A"}
                                            </p>

                                        </div>

                                        <div className="text-right min-w-0">
                                            <p className="text-sm sm:text-lg font-bold text-gray-900 truncate">
                                                {booking.busId?.arrivalTime || "--"}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                                {booking.busId?.to || "N/A"}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="border-t border-dashed border-gray-200 my-5"></div>

                                    {/* Booking Information */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">

                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">
                                                Seat Number
                                            </p>

                                            <p className="font-semibold text-gray-800">
                                                {booking.seatNumber}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">
                                                Ticket Price
                                            </p>

                                            <p className="text-lg font-bold text-black">
                                                ₹{booking.price}
                                            </p>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <p className="text-xs text-gray-400 mb-1">
                                                Booking Status
                                            </p>

                                            <p className="font-semibold text-gray-800">
                                                {booking.bookingStatus}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Cancel Button */}
                                    {booking.bookingStatus === "Booked" ? (

                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                                        >
                                            Cancel Booking
                                        </button>

                                    ) : (

                                        <p className="text-sm text-gray-500 font-medium">
                                            This booking has been cancelled.
                                        </p>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyBookings;
