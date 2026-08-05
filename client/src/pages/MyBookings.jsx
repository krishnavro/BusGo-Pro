import { useEffect, useState } from "react";
import api from "../services/api";
import ProtectedRoute from "../components/ProtectedRoute";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const getMyBookings = async () => {

        try {

            const response = await api.get(
                "/booking/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setBookings(response.data.bookings);

        } catch (error) {
            console.log(error);
        }

    };
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

        alert(error.response?.data?.message || "Cancel Failed");

    }

};
    useEffect(() => {
        getMyBookings();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-6">
                My Bookings
            </h1>

            {bookings.map((booking) => (

                <div
                    key={booking._id}
                    className="border p-5 rounded mb-5 shadow"
                >

                    <h2 className="text-2xl font-bold">
                        {booking.busId.busName}
                    </h2>

                    <p>
                        {booking.busId.from} → {booking.busId.to}
                    </p>

                    <p>
                        Seat Number : {booking.seatNumber}
                    </p>

                    <p>
                        Price : ₹{booking.price}
                    </p>

                    <p>
                        Status : {booking.bookingStatus}
                    </p>
                    {booking.bookingStatus === "Booked" ? (

                    <button
                        onClick={() => cancelBooking(booking._id)}
                        className="mt-4 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                    >
                        Cancel Booking
                    </button>

                ) : (

                    <p className="mt-4 text-green-600 font-bold">
                        Booking Cancelled
                    </p>

                )}

                </div>

            ))}

        </div>
    );
}

export default MyBookings;