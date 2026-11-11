
function BusSort({ sortBy, setSortBy }) {

    return (

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

            <h2 className="font-semibold text-gray-800">
                Sort Buses
            </h2>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >

                <option value="recommended">
                    Recommended
                </option>

                <option value="price-low">
                    Price: Low to High
                </option>

                <option value="price-high">
                    Price: High to Low
                </option>

                <option value="departure">
                    Departure: Earliest First
                </option>

            </select>

        </div>

    );

}

export default BusSort;
