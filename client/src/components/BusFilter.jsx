
function BusFilters({ filters, setFilters }) {

    const handleBusType = (type) => {

        setFilters((prev) => ({
            ...prev,
            busType: prev.busType === type ? "" : type
        }));

    };

    const handlePrice = (e) => {

        setFilters((prev) => ({
            ...prev,
            maxPrice: Number(e.target.value)
        }));

    };

    const handleDeparture = (time) => {

        setFilters((prev) => ({
            ...prev,
            departureTime: prev.departureTime === time ? "" : time
        }));

    };

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

            {/* Heading */}

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-gray-900">
                    Filters
                </h2>

                <button
                    onClick={() => setFilters({
                        busType: "",
                        maxPrice: 5000,
                        availableSeats: false,
                        departureTime: ""
                    })}
                    className="text-sm text-blue-600 font-semibold hover:underline"
                >
                    Clear All
                </button>

            </div>


            {/* Bus Type */}

            <div className="mb-6">

                <h3 className="font-semibold text-gray-800 mb-3">
                    Bus Type
                </h3>

                {["AC", "Non-AC", "Sleeper", "Seater"].map((type) => (

                    <label
                        key={type}
                        className="flex items-center gap-3 mb-3 cursor-pointer text-gray-600"
                    >

                        <input
                            type="checkbox"
                            checked={filters.busType === type}
                            onChange={() => handleBusType(type)}
                            className="accent-blue-600 w-4 h-4"
                        />

                        {type}

                    </label>

                ))}

            </div>


            <div className="border-t border-gray-200 my-5"></div>


            {/* Price Range */}

            <div className="mb-6">

                <h3 className="font-semibold text-gray-800 mb-3">
                    Maximum Price
                </h3>

                <p className="text-black font-bold mb-3">
                    ₹{filters.maxPrice}
                </p>

                <input
                    type="range"
                    min="300"
                    max="5000"
                    step="100"
                    value={filters.maxPrice}
                    onChange={handlePrice}
                    className="w-full accent-blue-600 cursor-pointer"
                />

                <div className="flex justify-between text-xs text-gray-400">
                    <span>₹300</span>
                    <span>₹5000</span>
                </div>

            </div>


            <div className="border-t border-gray-200 my-5"></div>


            {/* Available Seats */}

            <div className="mb-6">

                <label className="flex items-center gap-3 cursor-pointer">

                    <input
                        type="checkbox"
                        checked={filters.availableSeats}
                        onChange={(e) => setFilters((prev) => ({
                            ...prev,
                            availableSeats: e.target.checked
                        }))}
                        className="accent-blue-600 w-4 h-4"
                    />

                    <span className="font-semibold text-gray-800">
                        Available Seats Only
                    </span>

                </label>

            </div>


            <div className="border-t border-gray-200 my-5"></div>


            {/* Departure Time */}

            <div>

                <h3 className="font-semibold text-gray-800 mb-3">
                    Departure Time
                </h3>

                {["Morning", "Afternoon", "Evening", "Night"].map((time) => (

                    <label
                        key={time}
                        className="flex items-center gap-3 mb-3 cursor-pointer text-gray-600"
                    >

                        <input
                            type="checkbox"
                            checked={filters.departureTime === time}
                            onChange={() => handleDeparture(time)}
                            className="accent-blue-600 w-4 h-4"
                        />

                        {time}

                    </label>

                ))}

            </div>

        </div>

    );

}

export default BusFilters;
