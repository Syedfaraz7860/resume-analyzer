import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    // ================= INPUT CHANGE =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ================= LOGIN =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");

        try {
            const response = await api.post(
                "/auth/login",
                form
            );

            console.log(
                "Login response:",
                response.data
            );

            // ================= SAVE TOKEN =================
            localStorage.setItem(
                "token",
                response.data.token
            );

            // ================= SAVE USER ID =================
            if (response.data.user?.id) {
                localStorage.setItem(
                    "userId",
                    response.data.user.id
                );
            }

            // ================= SUCCESS =================
            setMsg("Login successful!");

            setTimeout(() => {
                navigate("/Home");
            }, 500);

        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data || error.message
            );

            const message =
                error.response?.data?.message;

            // ================= USER NOT FOUND =================
            if (message === "User does not exist") {
                navigate("/Sign");
                return;
            }

            // ================= WRONG PASSWORD =================
            if (message === "Invalid credentials") {
                setMsg("Invalid email or password");
                return;
            }

            // ================= OTHER ERROR =================
            setMsg(
                message || "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <h1 className="text-2xl font-bold mb-4">
                Login
            </h1>

            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >

                {/* EMAIL */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* LOGIN BUTTON */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    type="submit"
                >
                    Login
                </button>

                {/* SIGNUP LINK */}
                <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/Sign")}
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                        Signup
                    </button>
                </p>

            </form>

            {/* MESSAGE */}
            {msg && (
                <p
                    className={`mt-4 text-center ${
                        msg === "Login successful!"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {msg}
                </p>
            )}

        </div>
    );
}