import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchSection({ margintop}) {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [journeyDate, setJourneyDate] = useState("");

    useEffect(() => {

        setFrom(searchParams.get("from") || "");
        setTo(searchParams.get("to") || "");
        setJourneyDate(searchParams.get("date") || "");

    }, [searchParams]);

    const handleSearch = () => {

        navigate(
            `/search?from=${from}&to=${to}&date=${journeyDate}`
        );

    };

    return (

        <div className={`max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 ${margintop}`}>

            <div className="grid md:grid-cols-4 gap-4">

                <input
                    type="text"
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="border p-3 rounded"
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Search Bus
                </button>

            </div>

        </div>

    );

}

export default SearchSection;