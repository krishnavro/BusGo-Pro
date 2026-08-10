import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBus() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        busName: "",
        busNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        journeyDate: "",
        runsDaily: false,
        totalSeats: "",
        price: "",
        busType: "AC",
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });

    };

    const getBus = async () => {

        try {

            const response = await api.get(`/bus/${id}`);

            const bus = response.data.bus;

            setForm({

                busName: bus.busName || "",
                busNumber: bus.busNumber || "",
                from: bus.from || "",
                to: bus.to || "",
                departureTime: bus.departureTime || "",
                arrivalTime: bus.arrivalTime || "",

                journeyDate: bus.journeyDate
                    ? bus.journeyDate.split("T")[0]
                    : "",

                runsDaily: bus.runsDaily || false,

                totalSeats: bus.totalSeats || "",
                price: bus.price || "",
                busType: bus.busType || "AC",

            });

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getBus();

    }, [id]);


    const handleUpdateBus = async () => {

        try {

            const busData = {

                ...form,

                journeyDate: form.runsDaily
                    ? null
                    : form.journeyDate,

            };

            const response = await api.put(

                `/bus/update/${id}`,

                busData,

                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`,
                    },
                }

            );

            alert(response.data.message);

            navigate("/operator/my-buses");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };


    return (

        <div className="max-w-4xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                Edit Bus
            </h1>


            <div className="grid grid-cols-2 gap-4">


                <input
                    type="text"
                    name="busName"
                    placeholder="Bus Name"
                    value={form.busName}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="text"
                    name="busNumber"
                    placeholder="Bus Number"
                    value={form.busNumber}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="text"
                    name="from"
                    placeholder="From"
                    value={form.from}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="text"
                    name="to"
                    placeholder="To"
                    value={form.to}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="time"
                    name="departureTime"
                    value={form.departureTime}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="time"
                    name="arrivalTime"
                    value={form.arrivalTime}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <div className="flex items-center gap-3 border p-3 rounded">

                    <input
                        type="checkbox"
                        name="runsDaily"
                        checked={form.runsDaily}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                    <label className="font-semibold">
                        Runs Daily
                    </label>

                </div>


                {!form.runsDaily && (

                    <input
                        type="date"
                        name="journeyDate"
                        value={form.journeyDate}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                )}


                <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total Seats"
                    value={form.totalSeats}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />


                <select
                    name="busType"
                    value={form.busType}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >

                    <option value="AC">
                        AC
                    </option>

                    <option value="Non-AC">
                        Non-AC
                    </option>

                    <option value="Sleeper">
                        Sleeper
                    </option>

                    <option value="Seater">
                        Seater
                    </option>

                </select>


            </div>


            <button
                onClick={handleUpdateBus}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
            >
                Update Bus
            </button>

        </div>

    );

}

export default EditBus;