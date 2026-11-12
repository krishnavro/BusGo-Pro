import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleLogin = async () => {

    try {

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        
        alert(response.data.message);

        if (response.data.user.role === "Traveller") {

            navigate("/");

        } else if (response.data.user.role === "Operator") {

            navigate("/operator/dashboard");

        } else {

            navigate("/admin/dashboard");

        }

    } catch (error) {

        alert(error.response?.data?.message || "Login Failed");

    }

};
    return (
        <div className="max-w-md mx-auto mt-20">

            <h1 className="text-3xl font-bold mb-8 text-center">
                Login
            </h1>

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

           <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded cursor-pointer"
          >
              Login
          </button>

        </div>
    );
}

export default Login;