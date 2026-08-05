import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddBus() {
const navigate = useNavigate();
    const [form, setForm] = useState({
        busName: "",
        busNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        journeyDate: "",
        totalSeats: "",
        price: "",
        busType: "AC",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleAddBus = async () => {

    try {
        const busData = {
    ...form,
    availableSeats: form.totalSeats,
};

        const response = await api.post(
            "/bus/register",
            busData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        alert(response.data.message);

        navigate("/operator/dashboard");

    } catch (error) {

        alert(error.response?.data?.message || "Failed to Add Bus");

    }

};

    return (

        <div className="max-w-4xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                Add New Bus
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

    <input
        type="date"
        name="journeyDate"
        value={form.journeyDate}
        onChange={handleChange}
        className="border p-3 rounded"
    />

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
    <option value="AC">AC</option>
    <option value="Non-AC">Non-AC</option>
    <option value="Sleeper">Sleeper</option>
    <option value="Seater">Seater</option>
    </select>

</div>

<button
    onClick={handleAddBus}
    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
>
    Add Bus
</button>

        </div>

    );

}

export default AddBus;