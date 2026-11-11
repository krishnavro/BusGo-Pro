
import { useEffect, useState } from "react";
import api from "../services/api";

function AllBuses() {

    const [buses, setBuses] = useState([]);

    const getAllBuses = async () => {
        try {
            const response = await api.get(
                "/admin/buses",
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

    useEffect(() => {
        getAllBuses();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
                All Buses
            </h1>

            <div className="w-full overflow-x-auto rounded">
                <table className="w-full min-w-[800px] border border-gray-300">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="border p-3">Bus</th>
                            <th className="border p-3">Number</th>
                            <th className="border p-3">Route</th>
                            <th className="border p-3">Operator</th>
                            <th className="border p-3">Seats</th>
                            <th className="border p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {buses.length > 0 ? (
                            buses.map((bus) => (
                                <tr key={bus._id} className="text-center">

                                    <td className="border p-3">
                                        {bus.busName}
                                    </td>

                                    <td className="border p-3">
                                        {bus.busNumber}
                                    </td>

                                    <td className="border p-3">
                                        {bus.from} → {bus.to}
                                    </td>

                                    <td className="border p-3">
                                        {bus.operatorId?.name}
                                    </td>

                                    <td className="border p-3">
                                        {bus.availableSeats}/{bus.totalSeats}
                                    </td>

                                    <td className="border p-3">
                                        {bus.isActive ? "Active" : "Inactive"}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border p-5 text-center">
                                    No Buses Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default AllBuses;
