
import { useEffect, useState } from "react";
import api from "../services/api";

function PendingOperators() {

    const [operators, setOperators] = useState([]);

    const getPendingOperators = async () => {
        try {
            const response = await api.get(
                "/admin/pending-operators",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setOperators(response.data.operators);

        } catch (error) {
            console.log(error);
        }
    };

    const approveOperator = async (id) => {
        try {
            const response = await api.put(
                `/admin/approve/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert(response.data.message);
            getPendingOperators();

        } catch (error) {
            if (error.response?.status === 401) return;

            alert(error.response?.data?.message || "Approval Failed");
        }
    };

    const rejectOperator = async (id) => {
        try {
            const response = await api.put(
                `/admin/reject/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert(response.data.message);
            getPendingOperators();

        } catch (error) {
            if (error.response?.status === 401) return;

            alert(error.response?.data?.message || "Reject Failed");
        }
    };

    useEffect(() => {
        getPendingOperators();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
                Pending Operators
            </h1>

            <div className="grid grid-cols-1 gap-5">

                {operators.length > 0 ? (
                    operators.map((operator) => (

                        <div
                            key={operator._id}
                            className="border rounded-lg p-4 sm:p-5 shadow bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                        >

                            <div className="min-w-0">
                                <h2 className="text-xl sm:text-2xl font-bold break-words">
                                    {operator.name}
                                </h2>

                                <p className="break-all mt-1">
                                    Email: {operator.email}
                                </p>

                                <p className="mt-1">
                                    Agency: {operator.agencyName}
                                </p>

                                <p className="mt-1">
                                    Phone: {operator.phone}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                                <button
                                    onClick={() => approveOperator(operator._id)}
                                    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => rejectOperator(operator._id)}
                                    className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    ))
                ) : (
                    <p className="text-center py-8 text-gray-500">
                        No Pending Operators Found
                    </p>
                )}

            </div>

        </div>
    );
}

export default PendingOperators;
