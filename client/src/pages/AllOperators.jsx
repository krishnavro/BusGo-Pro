
import { useEffect, useState } from "react";
import api from "../services/api";

function AllOperators() {

    const [operators, setOperators] = useState([]);

    const getOperators = async () => {
        try {
            const response = await api.get(
                "/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const operatorUsers = response.data.users.filter(
                (user) => user.role === "Operator"
            );

            setOperators(operatorUsers);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOperators();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
                All Operators
            </h1>

            <div className="w-full overflow-x-auto rounded">
                <table className="w-full min-w-[750px] border border-gray-300">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Agency</th>
                            <th className="p-3 border">Phone</th>
                            <th className="p-3 border">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {operators.length > 0 ? (
                            operators.map((operator) => (
                                <tr key={operator._id} className="text-center">

                                    <td className="border p-3">
                                        {operator.name}
                                    </td>

                                    <td className="border p-3">
                                        {operator.email}
                                    </td>

                                    <td className="border p-3">
                                        {operator.agencyName || "-"}
                                    </td>

                                    <td className="border p-3">
                                        {operator.phone || "-"}
                                    </td>

                                    <td className="border p-3">
                                        {operator.status}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border p-5 text-center">
                                    No Operators Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default AllOperators;
