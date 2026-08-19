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

        alert(error.response?.data?.message || "Reject Failed");

    }

};
    useEffect(() => {
        getPendingOperators();
    }, []);

    return (

    <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold mb-8">
            Pending Operators
        </h1>

    <div className="grid gap-5">

        {operators.map((operator) => (

        <div
            key={operator._id}
            className="border rounded-lg p-5 shadow flex justify-between items-center"
        >

        <div>

            <h2 className="text-2xl font-bold">
                {operator.name}
            </h2>

            <p>Email : {operator.email}</p>

            <p>Agency : {operator.agencyName}</p>

            <p>Phone : {operator.phone}</p>

        </div>

        <div className="flex gap-3">

            <button
                onClick={() => approveOperator(operator._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Approve
            </button>

            <button
                onClick={() => rejectOperator(operator._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Reject
            </button>

        </div>

        </div>

        ))}

    </div>

    </div>

    );

}

export default PendingOperators;