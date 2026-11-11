
import { useEffect, useState } from "react";
import api from "../services/api";

function AllUsers() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await api.get(
                "/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const travellers = response.data.users.filter(
                (user) => user.role === "Traveller"
            );

            setUsers(travellers);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
                All Travellers
            </h1>

            <div className="w-full overflow-x-auto rounded">
                <table className="w-full min-w-[650px] border border-gray-300">

                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Role</th>
                            <th className="p-3 border">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border p-3">
                                        {user.name}
                                    </td>

                                    <td className="border p-3">
                                        {user.email}
                                    </td>

                                    <td className="border p-3">
                                        {user.role}
                                    </td>

                                    <td className="border p-3">
                                        {user.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border p-5 text-center">
                                    No Travellers Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default AllUsers;
