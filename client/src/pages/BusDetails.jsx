import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BusDetails() {

  const { id } = useParams();

  const [bus, setBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const getBus = async () => {
    try {

      const response = await api.get(`/bus/${id}`);

      setBus(response.data.bus);

    } catch (error) {
      console.log(error);
    }
  };

  const getBookedSeats = async () => {
    try {

      const response = await api.get(`/booking/booked-seats/${id}`);

      setBookedSeats(response.data.bookedSeats);

    } catch (error) {
      console.log(error);
    }
  };

  const bookSeat = async () => {

    try {

        const response = await api.post(
            "/booking/book",
            {
                busId: id,
                seatNumber: selectedSeat,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        alert(response.data.message);
        await getBus();
        await getBookedSeats();
        setSelectedSeat(null);

    } catch (error) {

        alert(error.response?.data?.message || "Booking Failed");

    }

};

  useEffect(() => {
    getBus();
    getBookedSeats();
  }, []);

  if (!bus) {
    return (
      <h1 className="text-center mt-10 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-5">
        {bus.busName}
      </h1>

      <p>{bus.from} → {bus.to}</p>

      <p>
        <strong>
            {bus.runsDaily
                ? "Runs Daily"
                : `Journey Date : ${bus.journeyDate?.split("T")[0]}`}
        </strong>
    </p>

      <p>Departure : {bus.departureTime}</p>

      <p>Arrival : {bus.arrivalTime}</p>

      <p>Available Seats : {bus.availableSeats}</p>

      <p className="text-2xl font-bold text-blue-600 mb-8">
        ₹ {bus.price}
      </p>

      <h2 className="text-2xl font-bold mb-4">
        Select Your Seat
      </h2>

      <div className="grid grid-cols-4 gap-4">

        {Array.from(
          { length: bus.totalSeats },
          (_, i) => {

            const seatNumber = i + 1;

            const isBooked = bookedSeats.some(
              (seat) => seat.seatNumber === seatNumber
            );

            return (
              <button
                key={seatNumber}
                disabled={isBooked}
                onClick={() => setSelectedSeat(seatNumber)}
                className={`p-3 rounded font-bold transition
                ${
                  isBooked
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : selectedSeat === seatNumber
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-blue-300"
                }`}
              >
                {seatNumber}
              </button>
            );
          }
        )}

      </div>

      {selectedSeat && (
  <div className="mt-8">

    <h2 className="text-xl font-bold mb-4">
      Selected Seat : {selectedSeat}
    </h2>

    <button
    onClick={bookSeat}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Book Now
    </button>

  </div>
)}

    </div>
  );
}

export default BusDetails;