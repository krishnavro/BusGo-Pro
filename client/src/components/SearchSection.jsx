import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function SearchSection({ margintop }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [journeyDate, setJourneyDate] = useState("");

    const [fromCities, setFromCities] = useState([]);
    const [toCities, setToCities] = useState([]);

    useEffect(() => {
        setFrom(searchParams.get("from") || "");
        setTo(searchParams.get("to") || "");
        setJourneyDate(searchParams.get("date") || "");
    }, [searchParams]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get("/bus/locations");
                setFromCities(response.data.from);
                setToCities(response.data.to);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocations();
    }, []);

    const handleSearch = () => {
        if (!from || !to) {
            alert("Please select Your Source and Destination.");
            return;
        }

        navigate(`/search?from=${from}&to=${to}&date=${journeyDate}`);
    };

    return (
        <div className={`max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 ${margintop}`}>

            <div className="grid md:grid-cols-4 gap-4">

                <div>
                    <input
                        list="fromCities"
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="border p-3 rounded w-full"
                    />

                    <datalist id="fromCities">
                        {fromCities.map((city) => (
                            <option key={city} value={city} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <input
                        list="toCities"
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="border p-3 rounded w-full"
                    />

                    <datalist id="toCities">
                        {toCities.map((city) => (
                            <option key={city} value={city} />
                        ))}
                    </datalist>
                </div>

                <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="border p-3 rounded"
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white rounded justify-self-center px-4 py-2 w-fit hover:bg-blue-700 cursor-pointer"
                >
                    Search Bus
                </button>

            </div>

        </div>
    );
}

export default SearchSection;