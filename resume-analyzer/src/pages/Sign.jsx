import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await api.post(
                "/auth/signup",
                form
            );

            console.log("Signup Response:", response.data);

            setMessage(
                response.data.message ||
                "Signup successful!"
            );

            // Signup successful → Home
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            console.log("Signup Error:", error);

            setError(
                error.response?.data?.message ||
                "An error occurred"
            );
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">

                <h1 className="mb-6 text-center text-2xl font-bold">
                    Create Account
                </h1>


                {/* Success Message */}

                {message && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-center text-green-700">
                        {message}
                    </div>
                )}


                {/* Error Message */}

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-center text-red-700">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />


                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                    >
                        Sign up
                    </button>

                </form>

            </div>

        </div>
    );
}