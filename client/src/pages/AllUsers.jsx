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

            setUsers(response.data.users);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        getUsers();
    }, []);

    return (

        <div className="max-w-7xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                All Users
            </h1>

            <table className="w-full border border-gray-300">

                <thead className="bg-blue-600 text-white">

                    <tr>

                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Role</th>
                        <th className="p-3 border">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

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

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default AllUsers;