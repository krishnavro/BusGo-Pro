import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import SearchSection from "../components/SearchSection";

function SearchBus() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        if (from && to && date) {
            getBuses();
        } else {
            setLoading(false);
        }

    }, [from, to, date]);

    return (

        <>
            <SearchSection margintop="mt-10" />

            <div className="max-w-6xl mx-auto p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Search Results
                </h1>

                <p className="mb-8 text-lg">

                    <strong>{from}</strong>

                    {" → "}

                    <strong>{to}</strong>

                    {" | "}

                    {date}

                </p>


                {/* Loading */}

                {loading && (

                    <div className="text-center mt-20">

                        <p className="text-xl font-semibold">
                            Searching for buses...
                        </p>

                    </div>

                )}


                {/* No buses */}

                {!loading && buses.length === 0 && (

                    <div className="border rounded-lg bg-gray-50 p-10 text-center mt-10">

                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Route Journey Not Available
                        </h2>

                        <p className="text-lg text-gray-700 mb-2">
                            No buses are currently available for
                        </p>

                        <p className="text-xl font-bold mb-4">
                            {from} → {to}
                        </p>

                        <p className="text-gray-500">
                            Please try another From / To location or select
                            a different journey date.
                        </p>

                    </div>

                )}


                {/* Bus Results */}

                {!loading && buses.length > 0 && (

                    buses.map((bus) => (

                        <div
                            key={bus._id}
                            onClick={() => navigate(`/bus/${bus._id}`)}
                            className="border rounded-lg shadow-md p-5 mb-5 cursor-pointer hover:shadow-xl transition"
                        >

                            <h2 className="text-2xl font-bold">
                                {bus.busName}
                            </h2>

                            <p>
                                {bus.from} → {bus.to}
                            </p>

                            <p className="mt-2">

                                <strong>
                                    {bus.runsDaily
                                        ? "Runs Daily"
                                        : `Journey Date : ${bus.journeyDate?.split("T")[0]}`
                                    }
                                </strong>

                            </p>

                            <p>
                                Departure : {bus.departureTime}
                            </p>

                            <p>
                                Arrival : {bus.arrivalTime}
                            </p>

                            <p>
                                Seats Available : {bus.availableSeats}
                            </p>

                            <p className="text-xl font-bold text-blue-600">
                                ₹ {bus.price}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </>

    );
}

export default SearchBus;