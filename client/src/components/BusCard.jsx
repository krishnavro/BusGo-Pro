
function BusCard({ bus, onViewSeats }) {

    return (

        <div className="w-full min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

            <div className="p-4 sm:p-6">

                {/* Bus Operator */}

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-50 flex items-center justify-center text-3xl shrink-0">
                        🚌
                    </div>

                    <div className="min-w-0">
                        <h2 className="font-bold text-base sm:text-lg text-gray-900">
                            {bus.busName}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {bus.busType}
                        </p>

                        <p className="text-xs text-gray-400">
                            {bus.busNumber}
                        </p>
                    </div>

                </div>


                {/* Journey Details */}

                <div className="flex items-center justify-between gap-2">

                    {/* Departure */}

                    <div className="min-w-0">
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">
                            {bus.departureTime}
                        </p>

                        <p className="text-sm text-gray-500 truncate">
                            {bus.from}
                        </p>
                    </div>


                    {/* Journey Line */}

                    <div className="flex-1 min-w-0 text-center px-1 sm:px-3">

                        <p className="text-xs text-gray-400 mb-2">
                            Journey
                        </p>

                        <div className="flex items-center gap-1">

                            <div className="h-px bg-gray-300 flex-1"></div>

                            <span className="text-red-600">
                                🚌
                            </span>

                            <div className="h-px bg-gray-300 flex-1"></div>

                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                            {bus.runsDaily
                                ? "Daily"
                                : bus.journeyDate?.split("T")[0]
                            }
                        </p>

                    </div>


                    {/* Arrival */}

                    <div className="text-right min-w-0">
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">
                            {bus.arrivalTime}
                        </p>

                        <p className="text-sm text-gray-500 truncate">
                            {bus.to}
                        </p>
                    </div>

                </div>


                {/* Divider */}

                <div className="border-t border-dashed border-gray-200 my-5"></div>


                {/* Price and Seats */}

                <div className="flex justify-between items-center gap-3 mb-5">

                    <div>
                        <p className="text-sm font-semibold text-green-600">
                            {bus.availableSeats} Seats
                        </p>

                        <p className="text-xs text-gray-400">
                            Available
                        </p>
                    </div>

                    <div className="text-right">

                        <p className="text-2xl sm:text-3xl font-bold text-black">
                            ₹{bus.price}
                        </p>

                        <p className="text-xs text-gray-400">
                            Per passenger
                        </p>

                    </div>

                </div>


                {/* View Seats Button */}

                <button
                    onClick={onViewSeats}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-lg transition duration-200 w-full"
                >
                    View Seats →
                </button>

            </div>

        </div>

    );

}

export default BusCard;
