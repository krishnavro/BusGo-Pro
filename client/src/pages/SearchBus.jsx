
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import SearchSection from "../components/SearchSection";
import BusCard from "../components/BusCard";
import BusFilters from "../components/BusFilter";
import BusSort from "../components/BusSort";

function SearchBus() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [filters, setFilters] = useState({
        busType: "",
        maxPrice: 5000,
        availableSeats: false,
        departureTime: ""
    });

    // Sort State
    const [sortBy, setSortBy] = useState("recommended");

    // Mobile UI State
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);

    // Fetch Buses
    const getBuses = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                `/bus/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`
            );

            setBuses(response.data.buses || []);

        } catch (error) {
            console.log(error);
            setBuses([]);

        } finally {
            setLoading(false);
        }
    };

    // Filter Buses
    const filteredBuses = buses.filter((bus) => {

        // Bus Type
        if (filters.busType && bus.busType !== filters.busType) {
            return false;
        }

        // Maximum Price
        if (bus.price > filters.maxPrice) {
            return false;
        }

        // Available Seats
        if (filters.availableSeats && bus.availableSeats <= 0) {
            return false;
        }

        // Departure Time
        if (filters.departureTime) {
            const hour = Number(bus.departureTime.split(":")[0]);

            if (filters.departureTime === "Morning" && (hour < 6 || hour >= 12)) {
                return false;
            }

            if (filters.departureTime === "Afternoon" && (hour < 12 || hour >= 16)) {
                return false;
            }

            if (filters.departureTime === "Evening" && (hour < 16 || hour >= 20)) {
                return false;
            }

            if (filters.departureTime === "Night" && (hour < 20 || hour >= 24)) {
                return false;
            }
        }

        return true;
    });

    // Sort Buses
    const sortedBuses = [...filteredBuses].sort((a, b) => {

        if (sortBy === "price-low") {
            return a.price - b.price;
        }

        if (sortBy === "price-high") {
            return b.price - a.price;
        }

        if (sortBy === "departure") {
            const timeA = a.departureTime.split(":").map(Number);
            const timeB = b.departureTime.split(":").map(Number);

            const minutesA = timeA[0] * 60 + timeA[1];
            const minutesB = timeB[0] * 60 + timeB[1];

            return minutesA - minutesB;
        }

        return 0;
    });

    // Fetch when search parameters change
    useEffect(() => {
        if (from && to && date) {
            getBuses();
        } else {
            setBuses([]);
            setLoading(false);
        }
    }, [from, to, date]);

    return (
        <>
            <SearchSection margintop="mt-10" />

            <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">

                <div className="max-w-6xl mx-auto">

                    {/* Page Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Available Buses
                        </h1>

                        <p className="text-gray-500 mt-2">
                            <strong>{from}</strong>
                            {" → "}
                            <strong>{to}</strong>
                            {" | "}
                            {date}
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>

                            <p className="text-gray-600 font-medium">
                                Finding the best buses for you...
                            </p>
                        </div>
                    )}

                    {/* No Buses Available */}
                    {!loading && buses.length === 0 && (
                        <div className="bg-white border rounded-xl p-10 text-center">
                            <div className="text-5xl mb-4">
                                🚌
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                No Buses Available
                            </h2>

                            <p className="text-gray-500">
                                No buses found for {from} → {to}.
                            </p>

                            <p className="text-gray-400 text-sm mt-2">
                                Try another journey date or location.
                            </p>
                        </div>
                    )}

                    {/* Bus Results */}
                    {!loading && buses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                            {/* Desktop Filters Sidebar */}
                            <div className="hidden md:block md:col-span-1">
                                <BusFilters
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </div>

                            {/* Results Section */}
                            <div className="min-w-0 md:col-span-3">

                                {/* Mobile Filter and Sort Buttons */}
                                <div className="grid grid-cols-2 gap-3 mb-4 md:hidden">

                                    <button
                                        onClick={() => setShowFilters(true)}
                                        className="flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-lg py-3 font-semibold text-gray-700"
                                    >
                                        <span>☰</span>
                                        Filters
                                    </button>

                                    <button
                                        onClick={() => setShowSort(!showSort)}
                                        className="flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-lg py-3 font-semibold text-gray-700"
                                    >
                                        <span>↕</span>
                                        Sort Buses
                                    </button>

                                </div>

                                {/* Mobile Sort Section */}
                                <div className={`${showSort ? "block" : "hidden"} md:block mb-4`}>
                                    <BusSort
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                    />
                                </div>

                                {/* Bus Count */}
                                <p className="text-sm text-gray-500 mb-3">
                                    {filteredBuses.length} buses found
                                </p>

                                {/* Filtered Results */}
                                {filteredBuses.length === 0 ? (
                                    <div className="bg-white border rounded-xl p-10 text-center">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            No Matching Buses
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            Try changing or clearing your filters.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {sortedBuses.map((bus) => (
                                            <BusCard
                                                key={bus._id}
                                                bus={bus}
                                                onViewSeats={() => navigate(`/bus/${bus._id}`)}
                                            />
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Filter Drawer */}
                {showFilters && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 md:hidden"
                        onClick={() => setShowFilters(false)}
                    >
                        <div
                            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-gray-50 p-5 overflow-y-auto shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-bold">
                                    Filter Buses
                                </h2>

                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-2xl text-gray-600"
                                >
                                    ×
                                </button>
                            </div>

                            <BusFilters
                                filters={filters}
                                setFilters={setFilters}
                            />

                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg mt-5"
                            >
                                Show {filteredBuses.length} Buses
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default SearchBus;
