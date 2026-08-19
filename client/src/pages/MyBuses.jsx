import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function MyBuses() {

    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);

    const getMyBuses = async () => {

        try {

            const response = await api.get(
                "/bus/my-buses",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setBuses(response.data.buses);

        } catch (error) {

            console.log(error);

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

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    useEffect(() => {
        getMyBuses();
    }, []);

    return (

        <div className="max-w-6xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                My Buses
            </h1>

            <div className="grid gap-6">

            {buses.map((bus) => {

                console.log("BUS OBJECT :", bus);
                console.log("BUS ID :", bus._id);

                return (

                <div
                    key={bus._id}
                    className="border rounded-lg p-5 shadow"
                >

                    <h2 className="text-2xl font-bold">
                        {bus.busName}
                    </h2>

                    <p>Bus Number : {bus.busNumber}</p>

                    <p>{bus.from} → {bus.to}</p>

                    <p>
                        <strong>
                            {bus.runsDaily
                                ? "Runs Daily"
                                : `Journey Date : ${bus.journeyDate?.split("T")[0]}`}
                        </strong>
                    </p>

                    <p>
                        Seats : {bus.availableSeats}/{bus.totalSeats}
                    </p>

                    <p className="text-blue-600 font-bold">
                        ₹ {bus.price}
                    </p>

                    <div className="flex gap-3 mt-4">

                    <button
                        onClick={() => {

                            console.log("CLICKED ID :", bus._id);

                            navigate(`/operator/edit-bus/${bus._id}`);

                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => deleteBus(bus._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>

                    </div>

                </div>

                );

            })}

            </div>

        </div>

    );

}

export default MyBuses;