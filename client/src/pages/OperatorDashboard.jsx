import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function OperatorDashboard() {

    const navigate = useNavigate();
    const location = useLocation();

    const [dashboard, setDashboard] = useState({
        totalBuses: 0,
        activeBuses: 0,
        inactiveBuses: 0,
        totalSeats: 0,
        availableSeats: 0,
        bookedSeats: 0,
        totalRevenue: 0,
    });

    const getDashboard = async () => {

        try {

            const response = await api.get(
                "/bus/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
console.log(response.data.dashboard);
            setDashboard(response.data.dashboard);
            

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (

        <div className="max-w-6xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                Operator Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-6">

                <button
                    onClick={() => navigate("/operator/add-bus")}
                    className={`text-white p-8 rounded transition ${
                        location.pathname === "/operator/add-bus"
                            ? "bg-blue-800"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    <h2 className="text-2xl font-bold">
                        Add Bus
                    </h2>
                </button>

                <button
                    onClick={() => navigate("/operator/my-buses")}
                    className={`text-white p-8 rounded transition ${
                        location.pathname === "/operator/my-buses"
                            ? "bg-green-800"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    <h2 className="text-2xl font-bold">
                        My Buses
                    </h2>

                    <p className="mt-2">
                        Total : {dashboard.totalBuses}
                    </p>

                    <p>
                        Active : {dashboard.activeBuses}
                    </p>

                    <p>
                        Inactive : {dashboard.inactiveBuses}
                    </p>

                </button>

                <div className="bg-yellow-500 text-white p-8 rounded">

                    <h2 className="text-2xl font-bold">
                        Revenue
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                        ₹ {dashboard.totalRevenue}
                    </p>

                </div>

                <div className="bg-purple-600 text-white p-8 rounded">

                    <h2 className="text-2xl font-bold">
                        Analytics
                    </h2>

                    <p className="mt-3">
                        Total Seats : {dashboard.totalSeats}
                    </p>

                    <p>
                        Booked Seats : {dashboard.bookedSeats}
                    </p>

                    <p>
                        Available Seats : {dashboard.availableSeats}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default OperatorDashboard;