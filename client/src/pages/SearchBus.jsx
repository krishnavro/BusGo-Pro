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

    const getBuses = async () => {

        try {

            const response = await api.get(
                `/bus/search?from=${from}&to=${to}&date=${date}`
            );

            setBuses(response.data.buses);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        if (from && to && date) {

            getBuses();

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

                {buses.length === 0 ? (

                    <div className="text-center text-2xl font-semibold mt-20">

                        No Buses Found

                    </div>

                ) : (

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

                           <p>
                                <strong>
                                    {bus.runsDaily
                                        ? "Runs Daily"
                                        : `Journey Date : ${bus.journeyDate?.split("T")[0]}`}
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