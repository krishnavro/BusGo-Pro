import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useLocation } from "react-router-dom";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({});
    const location = useLocation();

    const getDashboard = async () => {

        try {

            const response = await api.get(
                "/admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

    <Link
        to="/admin/users"
        className={`p-6 rounded text-white ${
            location.pathname === "/admin/users"
                ? "bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
        }`}
    >
        <h2 className="text-xl">Users</h2>
        <p className="text-3xl font-bold">
            {dashboard.totalUsers}
        </p>
    </Link>

    <Link
        to="/admin/pending-operators"
        className={`p-6 rounded text-white ${
            location.pathname === "/admin/pending-operators"
                ? "bg-yellow-700"
                : "bg-yellow-500 hover:bg-yellow-600"
        }`}
    >
        <h2 className="text-xl">Pending</h2>
        <p className="text-3xl font-bold">
            {dashboard.pendingOperators}
        </p>
    </Link>

    <Link
                    to="/admin/operators"
                    className={`p-4 sm:p-6 rounded text-white ${
                        location.pathname === "/admin/operators"
                            ? "bg-green-800"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    <h2 className="text-base sm:text-xl">Operators</h2>
                    <p className="text-2xl sm:text-3xl font-bold">
                        {dashboard.totalOperators}
                    </p>
                </Link>

    <Link
        to="/admin/buses"
        className={`p-6 rounded text-white ${
            location.pathname === "/admin/buses"
                ? "bg-red-800"
                : "bg-red-500 hover:bg-red-600"
        }`}
    >
        <h2 className="text-xl">Buses</h2>
        <p className="text-3xl font-bold">
            {dashboard.totalBuses}
        </p>
    </Link>

</div>

    );

}

export default AdminDashboard;