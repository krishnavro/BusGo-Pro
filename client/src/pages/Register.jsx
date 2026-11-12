import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Traveller");

    const handleRegister = async () => {

        try {

            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                role,
            });

            if (role === "Traveller") {

              alert("Registration Successful. Please Login.");

              navigate("/login");

          } else {

              alert("Operator Registered Successfully.\nWait for Admin Approval.");

              navigate("/");

          }

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="max-w-md mx-auto mt-20">

            <h1 className="text-3xl font-bold mb-8 text-center">
                Register
            </h1>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            >
                <option value="Traveller">Traveller</option>
                <option value="Operator">Operator</option>
            </select>

            <button
                onClick={handleRegister}
                className="w-full bg-blue-600 text-white p-3 rounded cursor-pointer"
            >
                Register
            </button>

        </div>

    );

}

export default Register;