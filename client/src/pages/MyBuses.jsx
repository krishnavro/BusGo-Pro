
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function MyBuses() {

    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMyBuses = async () => {
        try {
            const response = await api.get("/bus/my-buses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setBuses(response.data.buses);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBus = async (id) => {
        try {
            const response = await api.put(
                `/bus/deactivate/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert(response.data.message);
            getMyBuses();

        } catch (error) {
            if (error.response?.status === 401) return;

            alert(error.response?.data?.message || "Delete Failed");
        }
    };

    useEffect(() => {
        getMyBuses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                    My Buses
                </h1>

                {loading ? (
                    <p className="text-center py-10 text-gray-500">
                        Loading buses...
                    </p>
                ) : buses.length === 0 ? (
                    <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">
                            No Buses Found
                        </h2>

                        <p className="text-gray-500 mb-5">
                            You haven't added any buses yet.
                        </p>

                        <button
                            onClick={() => navigate("/operator/add-bus")}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
                        >
                            Add Bus
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5">

                        {buses.map((bus) => (

                            <div
                                key={bus._id}
                                className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm"
                            >

                                {/* Bus Name and Number */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">

                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold">
                                            {bus.busName}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Bus Number: {bus.busNumber}
                                        </p>
                                    </div>

                                    <span className="text-blue-600 font-bold text-lg">
                                        ₹{bus.price}
                                    </span>

                                </div>

                                {/* Route */}
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">

                                    <p className="text-base sm:text-lg font-semibold break-words">
                                        {bus.from} → {bus.to}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {bus.runsDaily
                                            ? "Runs Daily"
                                            : `Journey Date: ${
                                                bus.journeyDate?.split("T")[0] || "N/A"
                                            }`}
                                    </p>

                                </div>

                                {/* Seats */}
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base mb-5">

                                    <p>
                                        <span className="text-gray-500">Available Seats:</span>{" "}
                                        <strong>{bus.availableSeats}</strong>
                                    </p>

                                    <p>
                                        <span className="text-gray-500">Total Seats:</span>{" "}
                                        <strong>{bus.totalSeats}</strong>
                                    </p>

                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">

                                    <button
                                        onClick={() => navigate(`/operator/edit-bus/${bus._id}`)}
                                        className="w-full sm:w-auto bg-yellow-500 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit Bus
                                    </button>

                                    <button
                                        onClick={() => deleteBus(bus._id)}
                                        className="w-full sm:w-auto bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700"
                                    >
                                        Delete Bus
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyBuses;
