import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

    };

    return (

        <nav className="bg-blue-600 text-white shadow-md">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <NavLink
              to="/"
            >
            <h1 className="text-2xl font-bold">
                BusGo Pro
            </h1>
           </NavLink>

        <div className="flex gap-6 items-center">

            {/* Guest */}

        {!token && (
            <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                isActive
                    ? "text-yellow-300 font-bold"
                    : "hover:text-yellow-300"
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/search"
                className={({ isActive }) =>
                    isActive
                        ? "text-yellow-300 font-bold"
                        : "hover:text-yellow-300"
                }
            >
                Search Bus
            </NavLink>

            <NavLink
                to="/login"
                className={({ isActive }) =>
                    isActive
                        ? "text-yellow-300 font-bold"
                        : "hover:text-yellow-300"
                }
            >
                Login
            </NavLink>

            <NavLink
                to="/register"
                className={({ isActive }) =>
                    isActive
                        ? "text-yellow-300 font-bold"
                        : "hover:text-yellow-300"
                }
            >
                Register
            </NavLink>
            </>
        )}

            {/* Traveller */}

        {token && role === "Traveller" && (
            <>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Search Bus
                </NavLink>

                <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    My Bookings
                </NavLink>
            </>
        )}

            {/* Operator */}

        {token && role === "Operator" && (
            <>
                <NavLink
                    to="/operator/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/operator/my-buses"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    My Buses
                </NavLink>

                <NavLink
                    to="/operator/add-bus"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Add Bus
                </NavLink>
            </>
        )}

        {/* Admin */}

        {token && role === "Admin" && (
            <>
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/pending-operators"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Pending Operators
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/buses"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-300 font-bold"
                            : "hover:text-yellow-300"
                    }
                >
                    Buses
                </NavLink>
            </>
        )}

        {/* Logout */}

        {token && (
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        )}

        </div>

        </div>

        </nav>

    );

}

export default Navbar;