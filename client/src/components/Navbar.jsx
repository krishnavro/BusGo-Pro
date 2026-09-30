import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

        setIsMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) => {
        return `px-4 py-2 bg-blue-800 rounded-lg font-medium transition-colors ${
            isActive
                ? "text-yellow-300 font-bold"
                : "hover:text-yellow-300"
        }`;
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (

        <nav className="bg-blue-700 text-white shadow-md">

            <div className="max-w-7xl mx-auto p-4">

                {/* Top section */}
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        onClick={handleLinkClick}
                    >
                        <h1 className="text-2xl font-bold text-white">
                            BusGo Pro
                        </h1>
                    </NavLink>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6 items-center">

                        {/* Guest */}

                        {!token && (
                            <>
                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/search"
                                    className={navLinkClass}
                                >
                                    Search Bus
                                </NavLink>

                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={navLinkClass}
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
                                    className={navLinkClass}
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/search"
                                    className={navLinkClass}
                                >
                                    Search Bus
                                </NavLink>

                                <NavLink
                                    to="/my-bookings"
                                    className={navLinkClass}
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
                                    className={navLinkClass}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/operator/my-buses"
                                    className={navLinkClass}
                                >
                                    My Buses
                                </NavLink>

                                <NavLink
                                    to="/operator/add-bus"
                                    className={navLinkClass}
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
                                    className={navLinkClass}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/admin/pending-operators"
                                    className={navLinkClass}
                                >
                                    Pending Operators
                                </NavLink>

                                <NavLink
                                    to="/admin/users"
                                    className={navLinkClass}
                                >
                                    Users
                                </NavLink>

                                <NavLink
                                    to="/admin/buses"
                                    className={navLinkClass}
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


                    {/* Hamburger Button */}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white text-3xl"
                    >
                        ☰
                    </button>

                </div>


                {/* Mobile Navigation */}

                {isMenuOpen && (
                    <div className="md:hidden flex flex-col items-end gap-3 mt-4">

                        {/* Guest */}

                        {!token && (
                            <>
                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/search"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Search Bus
                                </NavLink>

                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
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
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/search"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Search Bus
                                </NavLink>

                                <NavLink
                                    to="/my-bookings"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
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
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/operator/my-buses"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    My Buses
                                </NavLink>

                                <NavLink
                                    to="/operator/add-bus"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
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
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/admin/pending-operators"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Pending Operators
                                </NavLink>

                                <NavLink
                                    to="/admin/users"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
                                >
                                    Users
                                </NavLink>

                                <NavLink
                                    to="/admin/buses"
                                    className={navLinkClass}
                                    onClick={handleLinkClick}
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
                )}

            </div>

        </nav>
    );
}

export default Navbar;